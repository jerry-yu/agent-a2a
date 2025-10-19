const beijingAgent = require('./beijingAgent');
const newyorkAgent = require('./newyorkAgent');
const { v4: uuidv4 } = require('uuid');

// 设置相互查询功能
async function setupMutualQuery() {
  console.log('Setting up mutual query between agents...');
  
  // 北京agent查询纽约的天气
  // 通过直接调用纽约agent的客户端来获取天气信息
  async function getNewYorkWeather() {
    try {
      console.log('Beijing agent querying New York weather...');
      const weather = await newyorkAgent.getWeather();
      return weather;
    } catch (error) {
      console.error('Beijing agent query New York weather failed:', error);
      return { error: 'Failed to query New York weather' };
    }
  }
  
  // 纽约agent查询北京的天气
  // 通过直接调用北京agent的客户端来获取天气信息
  async function getBeijingWeather() {
    try {
      console.log('New York agent querying Beijing weather...');
      const weather = await beijingAgent.getWeather();
      return weather;
    } catch (error) {
      console.error('New York agent query Beijing weather failed:', error);
      return { error: 'Failed to query Beijing weather' };
    }
  }
  
  return {
    getNewYorkWeather,
    getBeijingWeather
  };
}

// 初始化相互查询
setupMutualQuery().then((queries) => {
  console.log('Agents initialized and mutual query setup complete');
  
  // 示例查询
  setTimeout(async () => {
    console.log('--- Beijing agent querying New York weather ---');
    const nyWeather = await queries.getNewYorkWeather();
    console.log('New York weather:', nyWeather);
    
    console.log('--- New York agent querying Beijing weather ---');
    const bjWeather = await queries.getBeijingWeather();
    console.log('Beijing weather:', bjWeather);
  }, 1000);
});

module.exports = {
  setupMutualQuery
};