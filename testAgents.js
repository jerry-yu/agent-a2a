const beijingAgent = require('./beijingAgent');
const newyorkAgent = require('./newyorkAgent');
const { v4: uuidv4 } = require('uuid');

async function testAgents() {
  console.log('Testing agent mutual query functionality...');

  try {
    // 测试北京agent获取天气
    console.log('--- Testing Beijing agent weather query ---');
    // 使用A2AClient连接agent server获取天气信息
    const bc = await beijingAgent.client;
    const bjMessageResponse = await bc.sendMessage({
      message: {
        messageId: uuidv4(),
        parts: [{ kind: 'text', text: 'Get weather information for Beijing' }],
        role: 'user'
      },
      configuration: {
        blocking: true
      }
    });

    if (bjMessageResponse.result?.parts?.[0]?.kind === 'text') {
      console.log('Beijing weather:', bjMessageResponse.result.parts[0].text);
    } else {
      console.log('Beijing weather: Failed to get weather information');
    }

    // 测试纽约agent获取天气
    console.log('--- Testing New York agent weather query ---');
    // 使用A2AClient连接agent server获取天气信息
    const nc = await newyorkAgent.client;
    const nyMessageResponse = await nc.sendMessage({
      message: {
        messageId: uuidv4(),
        parts: [{ kind: 'text', text: 'Get weather information for New York' }],
        role: 'user'
      },
      configuration: {
        blocking: true
      }
    });

    if (nyMessageResponse.result?.parts?.[0]?.kind === 'text') {
      console.log('New York weather:', nyMessageResponse.result.parts[0].text);
    } else {
      console.log('New York weather: Failed to get weather information');
    }

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// 运行测试
testAgents();