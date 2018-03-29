/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var navBar = "<div class='nav-bar'>" +
        "<div>" +
          "<div class='nav-drawer-button'></div>" +
        "</div>" +
      "</div>" +
      "<nav class='nav-drawer'>" +
        "<ul>" +
          "<li><a>Check-In</a></li>" +
          "<li><a>Journal</a></li>" +
          "<li><a>Resources</a></li>" +
          "<li><a>Interventions</a></li>" +
          "<li><a>Settings</a></li>" +
        "</ul>" +
      "</nav>";

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();

    var self = this;
    this.store = new MemoryStore (function() {
        self.loadCheckin();
    });
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },

  loadCheckin: function() {
    var html = "<div class='app' style='text-align:center'>" +
      "<h1>Check In</h1>" + 
      "<div><div class='emoji'>&#x1F603</div>" +
      "<div class='emoji'>&#x1F622</div></div>" +
      "<div><div class='emoji'>&#x1F610</div>" +
      "<div class='emoji'>&#x1F620</div></div>" +
      "<div><div class='emoji'>&#x1F62E</div>" +
      "<div class='emoji'>&#x1F634</div></div>" +
      "</div>";
    $('body').html(navBar + html);
    $('.emoji').on("click", function() {
      app.loadSuccessfulCheckin();
    });
  },

  loadSuccessfulCheckin: function() {
    var html = "<div class='app' style='text-align:center'>" +
      "<h1>Thank you!</h1>" + 
      "<p>You did it! Yay!</p>" +
      "</div>";
    $('body').html(navBar + html);

  },

  initNav: function() {
    var slideMenuButton = document.getElementById('nav-drawer-button');
    slideMenuButton.onclick = function (e) {
        var cl = document.body.classList;
        if (cl.contains('left-nav')) {
            cl.remove('left-nav');
        } else {
            cl.add('left-nav');
        }
    };
  }
};

app.initialize();
app.initNav();
