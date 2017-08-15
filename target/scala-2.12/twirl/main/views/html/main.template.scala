
package views.html

import _root_.play.twirl.api.TwirlFeatureImports._
import _root_.play.twirl.api.TwirlHelperImports._
import _root_.play.twirl.api.Html
import _root_.play.twirl.api.JavaScript
import _root_.play.twirl.api.Txt
import _root_.play.twirl.api.Xml
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

object main extends _root_.play.twirl.api.BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,_root_.play.twirl.api.Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with _root_.play.twirl.api.Template2[String,Html,play.twirl.api.HtmlFormat.Appendable] {

  /*
 * This template is called from the `index` template. This template
 * handles the rendering of the page header and body tags. It takes
 * two arguments, a `String` for the title of the page and an `Html`
 * object to insert into the body of the page.
 */
  def apply/*7.2*/(title: String)(content: Html):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*7.32*/("""

"""),format.raw/*9.1*/("""<!DOCTYPE html>
<html lang="en">
    <head>
        """),format.raw/*12.62*/("""
        """),format.raw/*13.9*/("""<title>"""),_display_(/*13.17*/title),format.raw/*13.22*/("""</title>
        <link rel="stylesheet" media="screen" href=""""),_display_(/*14.54*/routes/*14.60*/.Assets.versioned("stylesheets/main.css")),format.raw/*14.101*/("""">
        <link rel="shortcut icon" type="image/png" href=""""),_display_(/*15.59*/routes/*15.65*/.Assets.versioned("images/favicon.png")),format.raw/*15.104*/("""">
        <meta name="keywords" content="risx, wistful, tetris attack, panel de pon, pokemon puzzle league, puzle league, wistfulio">
        <meta property="og:description" content="Spiritual successor to Tetris Attack">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        """),format.raw/*22.32*/("""
        """),_display_(/*23.10*/content),format.raw/*23.17*/("""

      """),format.raw/*25.7*/("""<!-- <script>
        (function(i,s,o,g,r,a,m)"""),format.raw/*26.33*/("""{"""),format.raw/*26.34*/("""i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()"""),format.raw/*26.84*/("""{"""),format.raw/*26.85*/("""
        """),format.raw/*27.9*/("""(i[r].q=i[r].q||[]).push(arguments)"""),format.raw/*27.44*/("""}"""),format.raw/*27.45*/(""",i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        """),format.raw/*29.9*/("""}"""),format.raw/*29.10*/(""")(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-99573427-1', 'auto');
        ga('send', 'pageview');
      </script> -->

    </body>
</html>
"""))
      }
    }
  }

  def render(title:String,content:Html): play.twirl.api.HtmlFormat.Appendable = apply(title)(content)

  def f:((String) => (Html) => play.twirl.api.HtmlFormat.Appendable) = (title) => (content) => apply(title)(content)

  def ref: this.type = this

}


              /*
                  -- GENERATED --
                  DATE: Mon Aug 14 23:53:41 PDT 2017
                  SOURCE: C:/Users/rrris/Dropbox/github/wistfulio/app/views/main.scala.html
                  HASH: d2191a55a3f2f200ab8c0931a6399106c13e94ce
                  MATRIX: 992->266|1117->296|1147->300|1230->408|1267->418|1302->426|1328->431|1418->494|1433->500|1496->541|1585->603|1600->609|1661->648|2028->1078|2066->1089|2094->1096|2131->1106|2206->1153|2235->1154|2313->1204|2342->1205|2379->1215|2442->1250|2471->1251|2639->1392|2668->1393
                  LINES: 26->7|31->7|33->9|36->12|37->13|37->13|37->13|38->14|38->14|38->14|39->15|39->15|39->15|45->22|46->23|46->23|48->25|49->26|49->26|49->26|49->26|50->27|50->27|50->27|52->29|52->29
                  -- GENERATED --
              */
          