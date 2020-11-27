// import http from '@/api/http'

// How to use myfunction()
// 1) Import myfunction to your page (Ex: import myFunction from '~/components/aspiron/myFunction')
// 2) Call myfunction (Ex: myFunction.runBirtRpt(params))

export default {
  runBirtRpt (params) {
    // let url = `${process.env.VUE_APP_BASE_URL}/BirtReportServlet?`
    let url = '/api/BirtReportServlet?'
    let str = encodeURIComponent(params).replace(/[!'()]/g, escape).replace(/\*/g, '%2A')
    console.log('runBirtRpt URL : ', `${url}${str}`)

    window.open(`${str}${url}`)
    // location.assign(str + url)
  },
  downloadURL (url, index = 1) {
    // *https://stackoverflow.com/questions/18453595/how-can-i-use-window-location-href-to-download-multiple-files
    let hiddenIFrameID = `hiddenDownloader${index}`
    let iframe = document.createElement('iframe')
    iframe.id = hiddenIFrameID
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    iframe.src = url
    setTimeout(() => iframe.remove(), 2000)
  }

}