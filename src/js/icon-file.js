import axios from 'axios'
// 上传营业执照
export default function (file) {
  let data = new FormData()
  data.append('upimage', file.file)
  //   console.log(data)
  // Toast('正在上传...')
  // let token = 'jZvklXi8H9bs2bK9tBYYAoI19bjzAwU3_1556267215'
  return axios({
    method: 'post',
    url: 'apis/v1/upload/image',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + this.userInfo.access_token,
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 传入一个file
// export function onReadStore (file) {
// //   this.notimg = true
//   //   this.$refs.goodImg.src = file.content
//   //   console.log(file)

//   return uploadFileFn(file)
//   })
// }
