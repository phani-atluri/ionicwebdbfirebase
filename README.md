# <a href="https://github.com/rhildred/ionicwebdb" target="_blank">ionicwebdb</a>
Websql todo list with ionic.

This was started using <a href="https://ionicframework.com/docs/v1/getting-started/" target="_blank">these instructions.</a>

It can be tested using ripple-emulator.

1. `npm install -g ripple-emulator` if you haven't already.
1. In the www folder type `ripple emulate`

It can be built with phonegap build using [these instructions](https://pointdeveloper.com/how-to-build-ionic-app-with-phonegap-build/)

Generate a key using [these instructions](https://coderwall.com/p/r09hoq/android-generate-release-debug-keystores)

`keytool -genkey -v -keystore rhildred.github.io.keystore -alias rhildred.github.io -keyalg RSA -keysize 2048 -validity 10000`

![This is what I typed](https://rhildred.github.io/ionicwebdb/readmeimages/KeytoolCapture.PNG "What I typed")

# There is a lot that can be learned from this

!["learning objectives"](https://rhildred.github.io/ionicwebdb/readmeimages/objectives.PNG "learning objectives")

!["more learning objectives"](https://rhildred.github.io/ionicwebdb/readmeimages/objectives2.PNG "more learning objectives")

## Firstly the number of things that have been built with ionic

<a href="https://showcase.ionicframework.com/apps/newest" target="_blank">![ionic showcase](https://rhildred.github.io/ionicwebdb/readmeimages/Ionic_app_showcase.png "ionic showcase")</a>

## Secondly the difference between a hybrid and native app

![an ionic app](https://rhildred.github.io/ionicwebdb/readmeimages/ionicApp.PNG "an ionic app")![a material app](https://rhildred.github.io/ionicwebdb/readmeimages/MaterialApp.PNG "a material app")

Firstly they look different. Secondly there is more control over the device in native. Finally there are some things that aren't well supported by cordova plugins, Chromecast for instance.

### Pros of hybrid

1. Quicker development time. I got an app on the appstore with a student team in 90 days.
1. Cross Platform. It worked on BB10 (which the customer had), IOS and Android.

### Cons of Hybrid

1. They don't look the same as modern native apps.
1. Slower

There is also xamarin/mono game which is used to make cross-platform apps by businesses using .net like development.

## Html5 features used by mobile

![html5 rocks](https://rhildred.github.io/ionicwebdb/readmeimages/size_960_16_9_html5-rocks-20121.png "html5 rocks")

1. Location
2. Accelerometer
3. WebSQL
4. Touch
5. Canvas

## Css Features used by mobile

<a href="http://materializecss.com/" target="_blank">![materialize.css](https://rhildred.github.io/ionicwebdb/readmeimages/maxresdefault.jpg "materialize.css")</a>

Judging by materialize.css the answer is yes.