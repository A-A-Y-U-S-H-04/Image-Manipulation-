let myImage;
let originalImage;

function preload() {
  originalImage = loadImage('GA.jpg');
  myImage = loadImage('GA.jpg');
}

function setup() {
  createCanvas(windowWidth-20,windowHeight-20);
  // scales the image down for speed. Adjust at your own risk.   
  

  if(myImage.width>myImage.height) {
    originalImage.resize(width*0.5,0); 
    myImage.resize(width*0.5,0); 
  } else {
    originalImage.resize(0,height*0.5);
    myImage.resize(0,height*0.5);
  }
  
}

function draw() {
  image(myImage,width/2-myImage.width/2, height/2-myImage.height/2);
  noLoop();
}

const manipulationDispatch = {
  "1": invertColors,
  "2": desaturate,
  "r": resetImage,
  "3": flipImageH,
  //DO 5,6, and 7 together to get the full GA filter
  "4": pixelDensityChange,
  "5": gaBlue,
  "6": gaRed,
  "7": gaBlack,
  "8": halloweenScary,
  "9": flipImageDistorted,
  //the purpose for flipimageH2 is to give the user a distorted type of view; part of the original image (original pixels remain on the screen, while the image is flipped to it's side. It looks like they overlap!)                     
  
}

function keyPressed() {
  if( key in manipulationDispatch ) {
    myImage.loadPixels();
    manipulationDispatch[key]();
    myImage.updatePixels();
    redraw();
  }
}

function resetImage() {
  pixelDensity(1);
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(x,y));
    }
  }
}

function flipImageH() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(myImage.width- x, y));
    }
  }
}

function flipImageDistorted() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(myImage.height- y, x));
    }
  }
}



function desaturate() {
  const desaturateAmount = 0.8;
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {   
      let originalPixel = myImage.get(x,y);
      const r = red(originalPixel);
      const g = green(originalPixel);
      const b = blue(originalPixel);
      const LUMA = (Math.min(r,g,b) + Math.max(r,g,b))/2
      myImage.set(x,y, color(
        r + desaturateAmount * (LUMA-r),
        g + desaturateAmount * (LUMA-g),
        b + desaturateAmount * (LUMA-b)
      ));
    }
  }
}

function invertColors() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        255-red(originalPixel),
        255-green(originalPixel),
        255-blue(originalPixel)
      ));
    }
  }
}

function pixelDensityChange() {
  pixelDensity(0.15);
}

function gaBlue() {
  let blueTint = color(70, 100, 200, 200);
  const originalWeight = (255-alpha(blueTint))/255;
  const tintWeight = (alpha(blueTint))/255
  // loadPixels();
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      let r = red(originalPixel) * originalWeight + red(blueTint) * tintWeight;
      let g = green(originalPixel) * originalWeight + green(blueTint) * tintWeight;
      let b = blue(originalPixel) * originalWeight + blue(blueTint) * tintWeight;
      myImage.set( x, y, color(r,g,b));
    }
  }

}

function gaRed() {
let redTint = color(255,20,20,200)
 const originalWeight = (255-alpha(redTint))/255;
  const redTintWeight = (alpha(redTint))/255
  // loadPixels();
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x/2,y);
      let r = red(originalPixel) * originalWeight + red(redTint) * redTintWeight;
      let g = green(originalPixel) * originalWeight + green(redTint) * redTintWeight;
      let b = blue(originalPixel) * originalWeight + blue(redTint) * redTintWeight;
      myImage.set( x/2, y, color(r,g,b));
}
}

}

function gaBlack() {
let blackShade = color(10,10,10,200)
 const originalWeightB = (255-alpha(blackShade))/255;
  const blackTintWeight = (alpha(blackShade))/255
  // loadPixels();
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x ,y/3);
      let r = red(originalPixel) * originalWeightB + red(blackShade) * blackTintWeight;
      let g = green(originalPixel) * originalWeightB + green(blackShade) * blackTintWeight;
      let b = blue(originalPixel) * originalWeightB + blue(blackShade) * blackTintWeight;
      myImage.set(x, y/3, color(r,g,b));

    }
  }
   
  }


function halloweenScary() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        red(originalPixel),
        0,
        0,
      ));
    }
  }
}



