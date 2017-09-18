import FileService from './file.service'
import NameParsingService from './name-parsing.service'
import ListFormatterService from './list-formatter.service'
import filesByDateService from './files-by-date.service'
import { store } from '../store/store'

export default {
  checkAllFiles () {
    return Promise.all([
      this.checkFiles('validations'),
      this.checkFiles('referentials'),
      this.checkFiles('clinics'),
    ])
  },
  checkFiles (page) {
    const files = store.state.pages.files[page]
    if (!files || !files.length) {
      return store.dispatch('waitForFetch', {
        resource: 'files/' + page,
        fetch: () => getFiles(page),
      })
    } else {
      return Promise.resolve()
    }
  },
  getAllFiles () {
    return getFiles();
  },
  updateContent (fileType, numToInitialize) {
    return updateContent(fileType, numToInitialize)
  }
}

const updateContent = (fileType, files, numToInitialize) => {
  const filesToProcess = store.state.pages.files[fileType]
    .slice(0, numToInitialize)
    .filter(file => !file.content)
  const promises = [];
  filesToProcess.forEach(file => {
    promises.push(getContent(fileType, file))
  })
  return Promise.all(promises)
}

const filePrefixes = {
  validations: ['Volatile Validations'],
  referentials: ['Emergency RI checks', 'PatientRecord RI checks', 'MedicalRecord RI checks',
    'Maternity RI checks', 'Inpatient RI checks', 'Outpatient RI checks'],
  clinics: ['Clinics']
}

const getFiles = (page) => {
  const filesPromise = FileService.getFileList()
    .then(fileList => {
      const prefixes = filePrefixes[page]
      const filesOfType = fileList.filter(file => prefixes.some(value => file.startsWith(value)));
      const promises = processFiles( filesOfType, page, prefixes );
      return Promise.all(promises)
    })
    .then(files => {
      store.commit('SET_FILES', {page, files})
    })
  return filesPromise
}

const processFiles = (files, fileType, filePrefixes) => {
  const parsed = NameParsingService.parseFiles(files, filePrefixes)
  const formatted = ListFormatterService.process(parsed)
  getNumToDisplay(formatted, fileType)
  const numToInitialize = getNumToInitialize(files, fileType) 
  const withContent = setContentForList(fileType, formatted, numToInitialize)
  return withContent;
}

const getNumToInitialize = (files, fileType) => {
  if (fileType === 'validations') {
    return store.state.config.validationsConfig.numDataPointsForSparkline;
  }
  if (fileType === 'clinics') {
    return store.state.config.clinicsConfig.numDataPointsForSparkline;
  }
  if (fileType === 'referentials') {
    const daysToInitialize = store.state.config.referentialsConfig.daysToInitialize
    const filesToInit = getCountFilesForLastNDays(daysToInitialize, files)
    return filesToInit
  }
}

const getNumToDisplay = (files, fileType) => {
  if (fileType === 'validations') { 
    store.commit('UPDATE_NUMVISIBLE', { 
      page: fileType,
      tag: fileType,
      numVisible: store.state.config.validationsConfig.numInitialFilesToDisplay
    })
  }
  if (fileType === 'clinics') { 
    store.commit('UPDATE_NUMVISIBLE', { 
      page: fileType,
      tag: fileType,
      numVisible: store.state.config.clinicsConfig.numInitialFilesToDisplay
    })
  }
  if (fileType === 'referentials') { 
    store.commit('UPDATE_NUMVISIBLE', { 
      page: fileType,
      tag: fileType,
      numVisible: getCountFilesForLastNDays(store.state.config.referentialsConfig.daysToDisplay, files)
    })
  }
}

const getCountFilesForLastNDays = (numDays, files) => {
  return filesByDateService.filesByDate(files)
    .slice(0, numDays)
    .map(group => group.files.length)
    .reduce((total, num) => { total += num; return total; }, 0 );
}

const setContentForList = (fileType, files, numToInitialize) => {
  const withContent = files.slice(0, numToInitialize).map(file => 
    file.content
      ? Promise.resolve(file) 
      : getContent(fileType, file)
    );
  const withoutContent = files.slice(numToInitialize).map(file => 
    Promise.resolve(file) 
  );
  const combined = withContent.concat(withoutContent);
  return combined
}

const getContent = (fileType, fileInfo) => {
  return FileService.getFile(fileInfo)
    .then(response => {
      const date = response.headers.get('last-modified');
      fileInfo.lastModified = date ? new Date(date) : null;
      return processContent(fileType, response.body, fileInfo);
    })
}

const processContent = (fileType, content, fileInfo) => {
  const id = 'dataContainer';
  const searchFor = /Command[\s]+Timeout[\s]+only[\s]+supported[\s]+by[\s]+SQL[\s]+Client[\s]+\(so[\s]+far\)<br\/>/;
  const regex = new RegExp(searchFor, 'g');
  const data = content.replace(regex, '');

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = data;
  prefixStylesWithId(tempDiv, id);
  fileInfo.content = tempDiv.innerHTML;

  fileInfo.metric = getMetric(fileType, tempDiv);

  fileInfo.badgeColor = getBadgeColor(fileType, fileInfo.metric);
  return fileInfo;
}

const getMetric = (fileType, tempDiv) => {
  if(fileType === 'referentials') {
    return getReferentialsMetric(tempDiv)
  }
  if(fileType === 'validations') {
    return getValidationsMetric(tempDiv)
  }
  if(fileType === 'clinics') {
    return getClinicsMetric(tempDiv)
  }  
}

const getValidationsMetric = (tempDiv) => {
  let total = 0;
  const elementsWithCount = tempDiv.getElementsByClassName('typeheader');
  for (let i = 0; i < elementsWithCount.length; ++i) {
    const countAsString = elementsWithCount[i].innerHTML.substr(1).split(' ')[0];
    const isnum = /^\d+$/.test(countAsString);
    if (isnum) {
      total += Number(countAsString);
    }
  }
  return total;
}

const getReferentialsMetric = (tempDiv) => {
  let total = 0;
  const elementsWithColumnTotal = tempDiv.getElementsByClassName('columntotal');
  const totalAsString = elementsWithColumnTotal[3].innerHTML;
  const isnum = /^\d+$/.test(totalAsString);
  if (isnum) {
    total = Number(totalAsString);
  }
  return total;    
}

const getClinicsMetric = (tempDiv) => {
  let totalErrors = 0;
  const elementsAffected = tempDiv.getElementsByClassName('columntotal affected');
  for (let i = 0; i < elementsAffected.length; i++) {
    totalErrors += getTotalFromElement(elementsAffected[i]);
  }

  const elementsActiveAppoints = tempDiv.getElementsByClassName('n active-appoints');
  const activeAppoints = elementsActiveAppoints.length === 0 ? 0 : getTotalFromElement(elementsActiveAppoints[0]);

  const percent = activeAppoints === 0 ? 0 : (activeAppoints - totalErrors) / activeAppoints * 100;
  return `${percent.toFixed(2)}%`;
}

const getTotalFromElement = (element) => {
  let total = 0;
  const totalAsString = element.innerHTML;
  const isnum = /^\d+$/.test(totalAsString);
  if (isnum) {
    total = Number(totalAsString);
  }
  return total;
}

const getBadgeColor = (fileType, metric) => {
  if(fileType === 'referentials') {
    return metric === 0 ? 'green'
      : metric < 10 ? 'orange' : 'red';
  }
  if(fileType === 'validations') {
    return metric === 0 ? 'green'
      : metric < 10 ? 'orange' : 'red';
  }
  if(fileType === 'clinics') {
    const num = +metric.replace('%', '');
    return num >= 95 ? 'green'
      : num >= 75 ? 'orange' : 'red';
  }
  return 'gray';
};

const prefixStylesWithId = (tempDiv, id) => {
  const styleSections = tempDiv.getElementsByTagName('style');
  for (let i = 0; i < styleSections.length; ++i) {
    const styles = styleSections[i];
    const styleLines = styles.innerHTML.split(/\r?\n/);
    const newStyles = [];
    styleLines.forEach((line) => {
      if (line.indexOf('{') !== -1) {
        line = '#' + id + ' ' + line;
        line = replaceAll(line, ',', ', #' + id);
      }
      newStyles.push(line);
    });
    styles.innerHTML = newStyles.join('\n');
  }
}

const replaceAll = (theString, search, replace) => {
  return theString.replace(new RegExp(escapeRegExp(search), 'g'), replace);
}

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\$&'); // $& means the whole matched string
}
