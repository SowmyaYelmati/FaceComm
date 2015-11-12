<script id="templates/sign-in.html" type="text/ng-template">
      <ion-view view-title="Sign-In">
        <ion-content>
          <div class="list">
            <label class="item item-input">
              <span class="input-label">Username</span>
              <input type="text" ng-model="username">
            </label>
            <label class="item item-input">
              <span class="input-label">Password</span>
              <input type="password" ng-model="pwd">
            </label>
          </div>
          <div class="padding">
            <button class="button button-block button-positive" ng-click="signIn(username,pwd)">
              Sign-In
            </button>
            <button class="button button-block button-positive" onclick="faceplustest()">
              Test JSON
            </button>
            <div><a href="index1.html" class="button button-block button-positive">FaceDetect</a></div>
            <div><a href="home.html" class="button button-block button-positive">AnotherDetect</a></div>
            <p class="text-center">
              <a href="#/forgot-password">Forgot password</a>
            </p>
            <p class="text-center">
              <a href="#/Registration">New User? Sign Up!</a>
            </p>
            <p class="text-center">
              <a href="#/changepassword">Change password</a>
            </p>
            <p class="text-center">
              <a href="#/deleteAccount"> Delete Account</a>
            </p>
          </div>
        </ion-content>
      </ion-view>
      </script>
      <script id="templates/deleteAccount.html" type="text/ng-template">
      <ion-view view-title="Delete Account">
        <ion-content>
          <div class="list">
            <label class="item item-input">
              <span class="input-label">Username</span>
              <input type="text" ng-model="username">
            </label>
            <label class="item item-input">
              <span class="input-label">Password</span>
              <input type="password" ng-model="pwd">
            </label>
          </div>
          <div class="padding">
            <button class="button button-block button-positive" ng-click="removeAcc(username,pwd)">
              Remove Account
            </button>
            <p>{{Msg}}</p>
            <p>
            Return to <a href="#/sign-in">Sign-In</a>.
          </p>
            </div>
        </ion-content>
      </ion-view>
    </script>
    <script id="templates/Registration.html" type="text/ng-template">
      <ion-view view-title="Get Started!!">
        <ion-content>
          <div class="list">
            <label class="item item-input">
              <span class="input-label">Username</span>
              <input type="text" ng-model="username">
            </label>
            <label class="item item-input">
              <span class="input-label">Password</span>
              <input type="password" ng-model="password">
            </label>
            <label class="item item-input">
              <span class="input-label">Email</span>
              <input type="text" ng-model="email">
            </label>
            <label class="item item-input">
              <span class="input-label">Phone</span>
              <input type="text" ng-model="phone">
            </label>
          </div>
          <div class="padding">
            <button class="button button-block button-positive" ng-click="register(username,password,email,phone)">
              Create Account
            </button>
            <p > {{msg}}</p>
            <p>
            Return to <a href="#/sign-in">Sign-In</a>.
          </p>
          </div>
        </ion-content>
      </ion-view>
    </script>
    
    <script id="templates/changepassword.html" type="text/ng-template">
      <ion-view view-title="change password">
        <ion-content padding="true">
          <div class="list">
            <label class="item item-input">
              <span class="input-label">Enter your Email ID</span>
              <input type="text" ng-model="email">
            </label>
            <label class="item item-input">
              <span class="input-label">Enter your old password</span>
              <input type="password" ng-model="pwdold">
            </label>
            <label class="item item-input">
              <span class="input-label">Enter your new password</span>
              <input type="password" ng-model="pwdnew">
            </label>
	  </div>
          <div class="padding">
            <button class="button button-block button-positive" ng-click="changePassword(email,pwdold,pwdnew)">
              Submit
            </button>
            <p>{{displayMsg}} </p>
          <p>
            Return to <a href="#/sign-in">Sign-In</a>.
          </p>
        </ion-content>
      </ion-view>
    </script>

    <script id="templates/forgot-password.html" type="text/ng-template">
      <ion-view view-title="Forgot Password">
        <ion-content padding="true">
          <div class="list">
            <label class="item item-input">
              <span class="input-label">Enter your Email ID</span>
              <input type="text" ng-model="user.username">
            </label>
	  </div>
          <div class="padding">
            <button class="button button-block button-positive" ng-click="signIn(user)">
              Submit
            </button>
          <p>
            Return to <a href="#/sign-in">Sign-In</a>.
          </p>
        </ion-content>
      </ion-view>
    </script>
    
    <script id="templates/tabs.html" type="text/ng-template">
      <ion-view>
        <ion-tabs class="tabs-icon-top tabs-positive">

          <ion-tab title="Home" icon="ion-home" href="#/tab/home">
            <ion-nav-view name="home-tab"></ion-nav-view>
          </ion-tab>

          <ion-tab title="Gallery" icon="ion-ios-information" href="#/tab/Gallery">
            <ion-nav-view name="Gallery-tab"></ion-nav-view>
          </ion-tab>

          <ion-tab title="Sign-Out" icon="ion-log-out" href="#/sign-in">
          </ion-tab>

        </ion-tabs>
      </ion-view>
    </script>

    <script id="templates/home.html" type="text/ng-template">
      <ion-view view-title="Home">
        <ion-content padding="true" ng-controller="PictureCtrl" padding="true">
<button class="button button-full button-assertive" ng-click="takePhoto()">
Take Photo
</button>
<button class="button button-full button-assertive" ng-click="choosePhoto()">
Choose Photo
</button>
<img ng-show="imgURI !== undefined" ng-src="{{imgURI}}" style="text-align: center">
        </ion-content>
      </ion-view>
    </script>


    <script id="templates/Gallery.html" type="text/ng-template">
    
      <ion-view view-title="Gallery">
          <ion-pane>
            <ion-header-bar class="bar-stable">
            <h1 class="title">Pick an Image to assign a contact with it</h1>
            </ion-header-bar>
          <ion-content ng-controller="ImagePickerController">
          <button class="button button-full button-positive" ng-click="getImageSaveContact()">
                    Get Image and Save a Contact with It
          </button>
                <img id="testimage" ng-src="{{collection.selectedImage}}" style="width:100%; height: auto;" onclick="highlightFaces('testimage', 'red')"/></br>
                <img id="testimage"/>
            </ion-content>
           </ion-pane>
      </ion-view>
      </script>