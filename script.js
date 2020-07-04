/* */

const proPublicaKey = "cstJcNuEEeCQtdH8yWkpXroGmKK4yuuAecgKC7GL";
const civicKey = "AIzaSyBXX_LFscJIXrN_xa7JvFqda1GJXYE8L0Y";
// Version: {v1}. For congress parameters: {116}. 102-116 for House, 80-116 for Senate
var proPublicaMembersURL = `https://api.propublica.org/congress/v1/116/senate/members.json`

var proPublicaStatementsByMembers = `https://api.propublica.org/congress/v1/members/C001084/statements/115.json`

var electionId = "2000";
var address = "";


var electionURL = `https://www.googleapis.com/civicinfo/v2/elections?key=${civicKey}`;

var voterURL = `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${civicKey}&address=${address}&electionId=${electionId}&returnAllAvailableData=true`

var representativesInfoByAddressURL = `https://www.googleapis.com/civicinfo/v2/representatives?key=${civicKey}&address=${address}`

var rotate = setInterval(() => $('.shape').shape('flip up'), 3000)
$(document).ready(function () {
    $('#search').on("click", function () {
        $('#results').empty()
        var state = $('#state').val();
        var homeAddress = $('#address').val();
        var zip = $('#zip').val();

        address = `${homeAddress} ${zip} ${state}`

        representativesInfoByAddressURL = `https://www.googleapis.com/civicinfo/v2/representatives?key=${civicKey}&address=${address}`

        $.ajax({
            url: representativesInfoByAddressURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var officials = response.officials;
            console.log(officials);

            for (let i = 0; i < 5; i++) {

                var name = response.officials[i].name;
                var party = response.officials[i].party;
                var photo = response.officials[i].photoUrl;

                if (name === "Mike Pence") {
                    continue;
                }

                var card = $(
                    `<div class="card-flip-container">
                        <div class="card-flip" id=${i}>
                            <div class="frontcard">
                                <img width="100%" height="100%">     
                                <h3></h3>
                            </div>
                            <div class="backcard">
                                <h3></h3>
                            </div>
                        </div>
                    </div>`)

                /* To add media icons:
                <a><i class="twitter icon"></i></a>
                <a><i class="facebook square icon"></i></a>
                <a><i class="youtube icon"></i></a>*/

                $('#results').append(card)

                $(`#${i}>.frontcard>h3`).text(name)

                if (photo) {
                    $(`#${i}>.frontcard>img`).attr("src", photo)
                } else {
                    $(`#${i}>.frontcard>img`).attr("src", "assets/unknown.png")
                }

                if (party === "Republican Party") {
                    $(`#${i}>.backcard`).addClass("red")
                } else if (party === "Democratic Party") {
                    $(`#${i}>.backcard`).addClass("blue")
                } else {
                    $(`#${i}>.backcard`).addClass("unknown")
                }

                $(`#${i}>.backcard>h3`).text(party)


            }

        })
    })

    $('#voter').on("click", function (e) {
        e.preventDefault()
        $.ajax({
            url: voterURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $('#officials').empty()
            var contests = response.contests;

            for (let i = 0; i < contests.length; i++) {

                var office = contests[i].office;

                var candidates = contests[i].candidates;

                var id = office.replace(/\s+/g, '');

                $('#officials').append(`
                <div id ="${id}" class="row">
                <h1>${office}</h1> 
                </div>`)

                for (let j = 0; j < candidates.length; j++) {


                    var name = candidates[j].name
                    var party = candidates[j].party
                    // var url = candidates[i].candidateUrl;
                    // console.log(url);

                    var candId = name.replace(/\s+/g, '')

                    var card = (`<div id="${candId}">
                        <h3></h3>
                        <h4></h4>
                        </div>`)


                    $(`#${id}`).append(card)

                    $(`#${candId}>h3`).text(name)
                    $(`#${candId}>h4`).text(party)

                }
            }
        })
    })
    $('#ele').on("click", function (e) {
        e.preventDefault()
        $.ajax({
            url: electionURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

        })
    })
    $('#rep').on("click", function (e) {
        e.preventDefault()
        $.ajax({
            url: representativesInfoByAddressURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var officials = response.officials;

            for (let i = 0; i < officials.length; i++) {

                var name = response.officials[i].name;
                var party = response.officials[i].party;
                var photo = response.officials[i].photoUrl;

                var card = (`<div id ="${i}">
                <h3></h3>
                <h4></h4>
                <img width="175px" height="auto">
                </div>`)


                $('#officials').append(card)
                $(`#${i}>h3`).text(name)
                $(`#${i}>h4`).text(party)
                $(`#${i}>img`).attr("src", photo)

            }
        })
    })
})

$('#menu').on("click", function () {
    $('.ui.sidebar').sidebar('toggle');
})
$('.menu .item')
    .tab();
