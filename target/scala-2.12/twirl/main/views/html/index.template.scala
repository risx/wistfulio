
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

object index extends _root_.play.twirl.api.BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,_root_.play.twirl.api.Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with _root_.play.twirl.api.Template0[play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/():play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.4*/("""

"""),_display_(/*3.2*/main("Wistful")/*3.17*/ {_display_(Seq[Any](format.raw/*3.19*/("""
  """),format.raw/*4.3*/("""<div class='container'>
    <ul class='nav'>
      <li>
        <a href='/'>Play</a>
        <a id='leaderboard'>Leaderboard</a>
      </li>
    </ul>

  <div class='home-container'>
    <div class='left-content'>
      <div class="gameinfo">
        <div id='score'>Score: </div>
        <div id='time'>Time: </div>
        <!--<div id='fps'>FPS: </div>-->
      </div>
    </div>
      <div class='game-content'>
        <canvas id='wistful' width='336' height='680'></canvas>
      </div>
    <div class='right-content'>
      <div class="notes">
        <p> <b>Controls</b> <p>
        <li>Arrow keys: Move</li>
        <li>Shift: Toggles Speed</li>
        <li>Space: Switch Blocks</li>
        <li>P: Pause</li>
        <p>
        <b>Notes</b><br>
        There's a lot of known issues but if you want to or DM me on <a href="https://twitter.com/risx_" target="_blank">twitter</a> feel free to.
        The game is very much still in development.
        </p>
      </div>
      <button id="createGameButton" class="btn btn-default">Start</button>
    </div>
  </div>
  <script src=""""),_display_(/*39.17*/routes/*39.23*/.Assets.versioned("javascripts/core.js")),format.raw/*39.63*/("""" type="text/javascript"></script>
  <script src=""""),_display_(/*40.17*/routes/*40.23*/.Assets.versioned("javascripts/block.js")),format.raw/*40.64*/("""" type="text/javascript"></script>
  <script src=""""),_display_(/*41.17*/routes/*41.23*/.Assets.versioned("javascripts/game.js")),format.raw/*41.63*/("""" type="text/javascript"></script>
""")))}),format.raw/*42.2*/("""
"""))
      }
    }
  }

  def render(): play.twirl.api.HtmlFormat.Appendable = apply()

  def f:(() => play.twirl.api.HtmlFormat.Appendable) = () => apply()

  def ref: this.type = this

}


              /*
                  -- GENERATED --
                  DATE: Tue Aug 15 00:07:07 PDT 2017
                  SOURCE: C:/Users/rrris/Dropbox/github/wistfulio/app/views/index.scala.html
                  HASH: e03225ecebb2d1b685e568440ac5661bc029738c
                  MATRIX: 722->1|818->3|848->8|871->23|910->25|940->29|2093->1155|2108->1161|2169->1201|2248->1253|2263->1259|2325->1300|2404->1352|2419->1358|2480->1398|2547->1435
                  LINES: 21->1|26->1|28->3|28->3|28->3|29->4|64->39|64->39|64->39|65->40|65->40|65->40|66->41|66->41|66->41|67->42
                  -- GENERATED --
              */
          