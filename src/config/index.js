import globalConfig from 'app/config'

export default {
  env: globalConfig.current_env,
  newegg_login: globalConfig.newegg_authorization_url
}
