const fs = require('fs');
const path = require('path');

/**
 * 日志记录函数
 * @param {string} message - 要记录的消息
 */
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${message}`);
}

/**
 * 异步读取文件内容
 * @param {string} filePath - 文件路径
 * @returns {Promise<string>} 文件内容
 */
async function readFileAsync(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    log(`Error reading file at ${filePath}: ${error.message}`);
    throw error;
  }
}

/**
 * 异步写入文件
 * @param {string} filePath - 文件路径
 * @param {string} content - 要写入的内容
 */
async function writeFileAsync(filePath, content) {
  try {
    await fs.promises.writeFile(filePath, content, 'utf8');
    log(`File has been written at ${filePath}`);
  } catch (error) {
    log(`Error writing file at ${filePath}: ${error.message}`);
    throw error;
  }
}



/**
 * 确保文件夹存在，如果不存在则创建
 * @param {string} dirPath - 文件夹路径
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Directory created at ${dirPath}`);
  }
}

/**
 * 简单的数据转换示例函数
 * @param {number} value - 输入值
 * @param {number} rate - 转换率
 * @returns {number} 转换后的值
 */
function simpleConversion(value, rate) {
  return value * rate;
}

// 使用示例
(async () => {
  const filePath = path.join(__dirname, 'test.txt');
  const content = 'Hello, Node.js!';

  // 写入文件
  await writeFileAsync(filePath, content);

  // 读取文件
  const readContent = await readFileAsync(filePath);
  log(`Content from file: ${readContent}`);

  // JSON格式化
  const jsonData = { hello: 'world' };
  log(`Formatted JSON: ${formatJson(jsonData)}`);

  // 确保文件夹存在
  const dirPath = path.join(__dirname, 'testFolder');
  ensureDirectoryExists(dirPath);

  // 数据转换
  const convertedValue = simpleConversion(10, 1.1);
  log(`Converted Value: ${convertedValue}`);
})();
