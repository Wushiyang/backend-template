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
  bind: [{ required: true, message: '请输入绑定账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
  ],
  certification: [{ required: true, message: '请输入认证信息', trigger: 'blur' }]
}
