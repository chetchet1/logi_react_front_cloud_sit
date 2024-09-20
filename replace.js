const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 올바른 정규식 패턴
  const regex = /'(\$\{process\.env\.REACT_APP_DOCKER_API_URL[^']*)'/g;
  
  // 백틱으로 변환
  content = content.replace(regex, '`$1`');
  
  // 변경 사항을 파일에 다시 쓰기
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Processed: ${filePath}`);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath); // 재귀적으로 디렉토리를 탐색
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  });
}

const projectDir = 'E:/docker_Logi/79react_docker_front/src'; // 프로젝트 폴더 경로
walkDir(projectDir);
