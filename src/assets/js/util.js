import Compressor from 'compressorjs'
import watermark from 'watermarkjs'

const htmlToTextRegexp = new RegExp('>(.*?)<', 'g')
export const validate = {
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      // validator: (rule, value, callback) => {
      //   debugger
      //   return /^[1][3,4,5,7,8][0-9]{9}$/.test(value) ? callback(rule) : callback(new Error('请输入正确的手机号'))
      // },
      pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
  ],
  realname: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
  ],
  bind: [
    { required: true, message: '请输入绑定账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
  ],
  certification: [
    { required: true, message: '请输入认证信息', trigger: 'blur' }
  ]
}
// html转换成文本(safari不支持零宽断言,所以这样处理)
export const htmlToText = (str) => {
  let text = []
  str.replace(htmlToTextRegexp, function (match, sub1) {
    text.push(sub1)
  })
  return text.join('')
}
export const upload = {
  // 视频上传
  compressVideo (file) {
    if (file.type === 'video/mp4' || file.type === 'video/quicktime') {
      return this.excuteUpload(file).then(compressdata => {
        if (compressdata.code < 0) {
          throw new Error(compressdata.msg)
        }
        if (compressdata.data.size > 30 * 1024 * 1024) {
          throw new Error('上传视频超过30MB')
        }
        return compressdata
      })
    } else {
      throw new Error('视频上传只支持mp4')
    }
  },
  // 头像上传
  compressAvatar (file) {
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png'
    ) {
      return this.excuteUpload(file).then(compressdata => {
        if (compressdata.code < 0) {
          throw new Error(compressdata.msg)
        }
        if (
          (file.type === 'image/jpeg' || file.type === 'image/png') &&
          compressdata.data.size > 2 * 1024 * 1024
        ) {
          throw new Error('jpg/png文件压缩后超过2MB')
        }
        return compressdata
      })
    } else {
      throw new Error('头像上传只支持jpg、png')
    }
  },
  // 文件列表上传
  compressPicList (file) {
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif'
    ) {
      return this.excuteUpload(file).then(compressdata => {
        if (compressdata.code < 0) {
          throw new Error(compressdata.msg)
        }
        if (
          compressdata.data.type === 'image/gif' &&
          compressdata.data.size > 5 * 1024 * 1024
        ) {
          throw new Error('gif文件超过5MB')
        }
        if (
          (file.type === 'image/jpeg' || file.type === 'image/png') &&
          compressdata.data.size > 2 * 1024 * 1024
        ) {
          throw new Error('jpg/png文件压缩后超过2MB')
        }
        return compressdata
      })
    } else {
      throw new Error('图片上传只支持jpg、png、gif')
    }
  },
  excuteWatermark (file, text) {
    return new Promise((resolve) => {
      let imgurl = URL.createObjectURL(file)
      watermark([imgurl, '/static/images/logo@3x.png'], {
        type: file.type,
        encoderOptions: 1
      })
        .blob((orgin, logo) => {
          const context = orgin.getContext('2d')
          const w = orgin.width > orgin.height ? orgin.width / 2 : orgin.width // 尺寸宽度参考
          const logo_w = w * 0.07
          const logo_h = logo_w * logo.height / logo.width
          const font_s = w * 0.027
          context.font = `${font_s}px serif`
          context.fillStyle = 'white'
          // const font_l = w - w * 0.03 -  font_s * (text.length + 1)
          const font_l = orgin.width - orgin.width * 0.03 - context.measureText('@' + text).width
          const font_t = orgin.height - orgin.height * 0.03 // 绘制文本原点在文本的左下角
          const calibration = 0.15 * logo_h
          const logo_l = font_l - logo_w - orgin.width * 0.008
          const logo_t = font_t - logo_h + calibration // 绘制图片原点在文本的左上角
          context.drawImage(logo, logo_l, logo_t, logo_w, logo_h)
          context.fillText('@' + text, font_l, font_t)
          return orgin
        })
        .then(blob => {
          URL.revokeObjectURL(imgurl)
          console.log(URL.createObjectURL(blob))
          resolve(blob)
        })
    })
  },
  async excuteUpload (file, text) {
    let p
    let watermarkBlob
    switch (file.type) {
      case 'image/jpeg':
        if (text) {
          watermarkBlob = await this.excuteWatermark(file, text)
        }
        p = this.excuteJPG(watermarkBlob || file); break
      case 'image/png':
        if (text) {
          watermarkBlob = await this.excuteWatermark(file, text)
        }
        p = this.excutePNG(watermarkBlob || file); break
      case 'image/gif': p = this.excuteGIF(file); break
      case 'video/quicktime':
      case 'video/mp4': p = this.excuteVideo(file); break
      default: p = this.excuteOther(file)
    }
    return p
  },
  excuteJPG (file) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      new Compressor(file, {
        quality: 0.75,
        maxWidth: 2000,
        maxHeight: 2000,
        success (result) {
          resolve({
            code: 0,
            message: '成功',
            data: result
          })
        },
        error (err) {
          reject({
            code: 1,
            message: err,
            data: file
          })
        }
      })
    })
  },
  excutePNG (file) {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      new Compressor(file, {
        convertSize: 0,
        quality: 0.75,
        maxWidth: 2000,
        maxHeight: 2000,
        success (result) {
          resolve({
            code: 0,
            message: '成功',
            data: result
          })
        },
        error (err) {
          reject({
            code: 1,
            message: err,
            data: file
          })
        }
      })
    })
  },
  excuteGIF (file) {
    return new Promise((resolve, reject) => {
      resolve({
        code: 1,
        message: '成功,无转换',
        data: file
      })
    })
  },
  excuteVideo (file) {
    return new Promise((resolve, reject) => {
      resolve({
        code: 1,
        message: '成功，无转换',
        data: file
      })
    })
  },
  excuteOther () {
    return new Promise((resolve, reject) => {
      resolve({
        code: -1,
        message: '无法处理文件类型',
        data: file
      })
    })
  }
}
