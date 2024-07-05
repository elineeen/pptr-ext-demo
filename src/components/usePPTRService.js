import {
  connect,
  ExtensionTransport,
} from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';
import { onMounted, ref } from 'vue'
// const  browserInstance=ref(null)
export default function usePPTRService(){
  let browserInstance=null
  const newPage=async ()=>{
    try {
      const tab = await chrome.tabs.create({
        url:'about:blank'
      });
      await new Promise(resolve => {
        function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            resolve();
          }
        }
        chrome.tabs.onUpdated.addListener(listener);
      });
      browserInstance = await connect({
        transport: await ExtensionTransport.connectTab(tab.id),
      });
      // let instance=browserInstance.defaultBrowserContext()
      // const [page] = await instance.pages();
      const [page] = await browserInstance.pages();
      //resize to default browser size
      await page.setViewport({width:0,height:0,deviceScaleFactor:0})
      //reconstruct close method
      page.close=async ()=>{
        await browserInstance.disconnect()
        await chrome.tabs.remove(tab.id)
      }
      return page
    }catch (e) {
      console.dir(e)
    }
  }
  return {
    newPage,
  }
}
