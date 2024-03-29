// Author: Jordy A. Larrea Rodriguez


'use strict'
//Open the default tab
document.getElementById("defaultOpen").click();

// Add text to tab contents
const About_Me = document.getElementById("About_Me");
setUpParagraphText();

// Changes the style file if the device being used is a 'mobile' device
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
    $('head').append('<link rel="stylesheet" type="text/css" href="main_mobile.css">');

}

// block setting up the source data of the background images.
var backgroundImages = [];
var currImageIndex, newImageIndex;
const backgroundImageFilesPath = "./Resources/Images/BackgroundImages/BackgroundImage";
const backgroundImageCount = 26;
loadBackgroundImages();

currImageIndex = getRandomImageIndex(null);
var $backgroundImage;
setBackground();

/**
 * Adds text to tab contents
 */
function setUpParagraphText() {
    About_Me.append("Hi welcome to my personal website where one can find some of my \"productive\" personal pursuits and any relevant professional details of myself." +
        " I'm a Senior at the University of Utah pursuing a BS/MS in Electrical and Computer Engineering with Robotics Emphasis." +
        " I hold professional ambitions in medical/human-centered robotics: specifically, I'm quite interested in brain-computer interfaces." +
        " I'm an avid nature and animal lover, hence, the many scenic pictures on this site's background. My current research is in applying optimal control" + 
        " to drive a gait simulator for foot/ankle bio-mechanics based studies. Anyway, " +
        " thank you for visiting my website and feel free to take a gander at the tabbed sections for a more concise picture of, well, me.");
}
/**
 * Handler for the tab clicked event. Opens up the tab that corresponds to the clicked tab. 
 */
function openInformationTab(evt, TabName) {
    var i, tabcontents, tablinks;

    // Place all instances of "tabcontent" into an array and hide the contents 
    tabcontents = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none"
    }

    // Place all instances of "tablinks" into an array and remove the active tag
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and flag the tab as "active" given the button that was clicked
    document.getElementById(TabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/**
 * Places the source information (directory) of all images into an array.  
 */
function loadBackgroundImages() {

    for (var i = 0; i < backgroundImageCount; i++) {
        var imageNum = i + 1;
        backgroundImages[i] = backgroundImageFilesPath + imageNum + ".jpg";
    }
    return;
}
/**
 * Generates a random number that represents the index of an image directory.
 * 
 * @param {*} currImageIndex 
 * @returns a random number between 0 and the max number of background images - 1
 */
function getRandomImageIndex(currImageIndex) {
    var newImageIndex = Math.floor(Math.random() * backgroundImageCount);
    if (currImageIndex == null) {
        return newImageIndex;
    }
    if (currImageIndex != newImageIndex) {
        return newImageIndex;
    }
    return getRandomImageIndex(currImageIndex);
}
/**
 * Timed event loop that sets the initial background of the website and starts an event loop that replaces the background every set seconds.
 */
function setBackground() {

    var currentImageSrc = backgroundImages[currImageIndex];

    $backgroundImage = $('#backgroundImage');
    $backgroundImage.attr('src', currentImageSrc);


    newImageIndex = getRandomImageIndex(currImageIndex);
    setTimeout(() => { swapImage(); }, 10000);
}

/**  
* Swaps the current image with another random image by first animating a fade out of the previous image
*/
function swapImage() {
    $backgroundImage.animate({ opacity: 0 }, function () { fadeInImage(); });
    setTimeout(() => { swapImage(); }, 10000);
}

/**
 * Callback that finalizes the image swap process. Swaps the source of the previous image with a new image source and sets off
 * an animation involving the fade in of said new image.
 */
function fadeInImage() {
    $backgroundImage.animate({ opacity: 1 }, 1000);

    currImageIndex = newImageIndex;
    newImageIndex = getRandomImageIndex(newImageIndex);

    $backgroundImage.prop('src', backgroundImages[currImageIndex]);
}
