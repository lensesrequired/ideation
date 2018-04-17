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
      "<button class='nav-button' id='checkinBtn'>Check In</button>" +
      "<button class='nav-button' id='campusBtn'>Campus Data</button>" +
      "<button class='nav-button' id='campusBtn'>Resources</button>" +
      "<button class='nav-button' id='campusBtn'>Interventions</button>" +
      "<button class='nav-button' id='campusBtn'>Settings</button>" +
    "</nav>";

var dataServer = "http://10.0.0.12:2080";

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
      "<div>Check-In</div>" +
      "<form action='" + dataServer + "/emoji' method = 'POST'>" +
        "<input type='hidden' name='id' value='123'></input>" +
        "<input type='submit' name='happy' value='&#x1F603' class='emoji'></input>" +
        "<input type='submit' name='sad' value='&#x1F622' class='emoji'></input>" +
        "<input type='submit' name='meh' value='&#x1F610' class='emoji'></input>" +
        "<input type='submit' name='angry' value='&#x1F620' class='emoji'></input>" +
        "<input type='submit' name='gasp' value='&#x1F62E' class='emoji'></input>" +
        "<input type='submit' name='sleepy' value='&#x1F634' class='emoji'></input>" +
      "</form>" +
    "</div>";
    $('body').html(navBar + html);

    $('#checkinBtn').on('click', function() {
      app.loadCheckin();
    });

    $('#campusBtn').on('click', function() {
      app.loadCampusData();
    });

    $('input').on("click", function(e) {
      e.preventDefault();

      var url = $(this).parent('form').attr('action');
      var button = $(e.target);                 
      var result = $(this).parent('form').serialize() 
        + '&' 
        + encodeURI($(this).attr('name'))
        + '='
        + encodeURI($(this).attr('value'));

      $.post(url, result)
        .done( function() {
          app.loadSuccessfulCheckin();
        })
        .fail( function() {
          alert("Check in failed! Please try again.");
        });
      
    });
  },

  loadSuccessfulCheckin: function() {
    var html = "<div class='app' style='text-align:center'>" +
      "<h1>Thank you!</h1>" + 
      "<p>You did it! Yay!</p>" +
      "</div>";
    $('body').html(navBar + html);

    $('#checkinBtn').on('click', function() {
      app.loadCheckin();
    });

    $('#campusBtn').on('click', function() {
      app.loadCampusData();
    });
  },

  loadCampusData: function() {
    var request = new XMLHttpRequest();
    request.open("GET", dataServer + "/campusData", false);
    request.send(null);
    $('body').html(navBar + request.responseText);

    $('#checkinBtn').on('click', function() {
      app.loadCheckin();
    });

    $('#campusBtn').on('click', function() {
      app.loadCampusData();
    });
  },
};

app.initialize();
