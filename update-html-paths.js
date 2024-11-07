const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, 'build');
const cssFiles = fs.readdirSync(path.join(buildDir, 'static', 'css')).filter(file => file.startsWith('main') && file.endsWith('.css'));
const jsFiles = fs.readdirSync(path.join(buildDir, 'static', 'js')).filter(file => file.startsWith('main') && file.endsWith('.js'));

console.log('CSS Files:', cssFiles); // 디버깅용
console.log('JS Files:', jsFiles);   // 디버깅용

if (!cssFiles.length || !jsFiles.length) {
  console.error("Error: CSS or JS files not found. Please check the build directory structure.");
  process.exit(1);
}

const cssFile = cssFiles[0];
const jsFile = jsFiles[0];

console.log('Selected CSS File:', cssFile); // 디버깅용
console.log('Selected JS File:', jsFile);   // 디버깅용

const htmlFiles = [
  path.resolve(buildDir, 'index.html'),
  path.resolve(buildDir, 'index.ko.html'),
  path.resolve(buildDir, 'index.en.html'),
];

htmlFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // CSS 및 JS 파일 경로를 실제 해시 파일 이름으로 업데이트
    const updatedContent = content
      .replace(/(\/static\/css\/main\.)[a-zA-Z0-9]+(\.css)/g, `/static/css/${cssFile}`) // CSS 파일 경로 업데이트
      .replace(/(\/static\/js\/main\.)[a-zA-Z0-9]+(\.js)/g, `/static/js/${jsFile}`);    // JS 파일 경로 업데이트

    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated: ${filePath}`);
    } else {
      console.log(`No changes made to: ${filePath}`);
    }
  } else {
    console.error(`Error: ${filePath} does not exist.`);
  }
});