
// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/rrris/Dropbox/github/wistfulio/conf/routes
// @DATE:Mon Aug 14 19:02:43 PDT 2017


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
