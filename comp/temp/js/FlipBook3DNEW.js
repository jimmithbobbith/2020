
window.checkit = function () {
    var Book = window.book;

    if (totalPgs > window.bkbk.flippedleft) {

        var _page = window.pages[window.bkbk.flippedleft];
        console.log("window.checkit:   totalPgs > window.bkbk.flippedleft + _page = " + _page);

        _page.mod.apply();

    }
    if (0 < window.bkbk.flippedleft) {

        var _page2 = window.pages[window.bkbk.flippedleft - 1];
        console.log("window.checkit: 0 <  window.bkbk.flippedleft + _page = " +  _page2);

        _page2.mod.apply();

    }


}
window.signPage = 16;

window.startit = function () {


    TimeMe.setCurrentPageName(0);
    TimeMe.startTimer();
    window.ttdd ^= true;
    //window.controls.panUp(-25);
}
;
(function (root) {

    /**
     **  FlipBook3D using Three.js, MOD3.js and Tween.js
     **  Author Nikos M.
     **  url http://nikos-web-development.netai.net/
     **/

    // 3D Flip Book -------------------------------------------------------------------------------------------
    var self = {},
        Class = root.Classy.Class,
        THREE = root.THREE,
        TWEEN = root.TWEEN,
        MOD3 = root.MOD3,
        Book, Page, totalPgs, firstFlip, lastPg, Abs, PI;
    var i;
    var page;
    var hardn;
    var ayto;
    var mii, pagecol;
    var _page;
    var p2;
    var bookcenterPos;
    var numPgs;
    var tt;
    var thisPgIndex;
    var currPg;
    var oldLastPg = 0;
    var video, videoImage, videoTexture;
    window.nlnl = true;
    Abs = Math.abs;
    PI = Math.PI;
var    videoImageArr=[];
   var  movieMaterial=[];
   var videoArr=[];
    var videoTextureArr=[];
    var videoImageContextArr = [];

    var vidpg;
    for (vidpg = 0; vidpg < 40; vidpg++){




    videoArr[vidpg] = document.createElement( 'video' );
    // video.id = 'video';
    // video.type = ' video/ogg; codecs="theora, vorbis" ';
    videoArr[vidpg].src = "videos/"+vidpg+".mov";
    videoArr[vidpg].load(); // must call after setting/changing source
    // videoArr[vidpg].play();




    // alternative method --
    // create DIV in HTML:
    // <video id="myVideo" autoplay style="display:none">
    //		<source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
    // </video>
    // and set JS variable:
    // video = document.getElementById( 'myVideo' );

    videoImageArr[vidpg] = document.createElement( 'canvas' );
    videoImageArr[vidpg].width = 640;
    videoImageArr[vidpg].height = 640;

    videoImageContextArr[vidpg] = videoImageArr[vidpg].getContext( '2d' );
    // background color if no video present
    videoImageContextArr[vidpg].fillStyle = '#000000';
    videoImageContextArr[vidpg].fillRect( 100, 100, videoImageArr[vidpg].width, videoImageArr[vidpg].height );

    videoTextureArr[vidpg] = new THREE.Texture( videoImageArr[vidpg] );
    videoTextureArr[vidpg].minFilter = THREE.LinearFilter;
    videoTextureArr[vidpg].magFilter = THREE.LinearFilter;

        movieMaterial[vidpg] = new THREE.MeshBasicMaterial({
            map: videoTextureArr[vidpg],
            overdraw: true,
            side: THREE.DoubleSide
        });
    }
window.videoArr=videoArr;
    window.vidf = function (vidpg) {
        if (videoArr[vidpg].readyState ===videoArr[vidpg].HAVE_ENOUGH_DATA )
        {
            videoArr[vidpg].volume = 0.2;
            videoImageContextArr[vidpg].drawImage(videoArr[vidpg], 0, 0 );
            if (videoTextureArr[vidpg] )
                videoTextureArr[vidpg].needsUpdate = true;
        }

    }


    // Book  Class-------------------------------------------------------------------------------------------




    Book = window.book = self.Book = Class(THREE.Object3D,
        {

            constructor: function () {
                this.$super("constructor");

                this.pages = null;
                this.pageWidth = 0;
                this.pageHeight = 0;
                this.currentPage = 0;
                this.flippedleft = 0;
                this.flippedright = 0;
                this.duration = 1;
                this.centerContainer = new THREE.Object3D();
                this.add(this.centerContainer);
                this.pages = [];
            },

            pages: null,
            pageWidth: 0,
            pageHeight: 0,
            currentPage: 0,
            flippedleft: 0,
            flippedright: 0,
            duration: 1,
            centerContainer: null,

            getNumPages: function () {
                return ( this.pages.length);
            },

            addPage: function (pf, pb, hardness, pageColor) {

                hardn = 0.5;
                pagecol = 0x555555;

                if (typeof hardness != 'undefined')
                    hardn = hardness;
                if (typeof pageColor != 'undefined')
                    pagecol = pageColor;

                i = this.pages.length;
                page = new Page(this, i, pf, pb, hardn, pagecol);
                page.duration = this.duration;

                this.pages.push(page);
                this.centerContainer.add(page);
                window.pages = this.pages;
                window.totalPgs = totalPgs = this.pages.length;

                return this;
            }
        });

    // Page Class -------------------------------------------------------------------------------------------
    Page = self.Page = Class(THREE.Mesh,
        {
            constructor: function (book, i, matf, matb, hard, col) {
                this.book = book;
                this.matFront = matf;
                this.matBack = matb;
                this.index = i;
                console.log("MAKING PAGE - "+i);
                vidpg = i;
                this.pW = this.book.pageWidth;
                this.pH = this.book.pageHeight;
                this.nfacesw = 20;
                //this.pW*0.1;
                this.nfacesh = 20;
                //this.pH*0.1;
                this.mats = [];
                this.pageHardness = hard;
                this.duration = 1;
                this.angle = .25 * PI * this.pW / this.pH;
                this.force = 6;
                this.to = null;
                this.flipPt = 0.3;
                this.mod = null;
                this.bend = null;
                this.pivot = null;
                this.isFlippedLeft = false;
                this.isFlippedRight = true;
                this.flippingLeft = false;
                this.flippingRight = false;
                this.zz = 0.2;
                this.pageColor = col;
                this.sides = {
                    bottom: 3,
                    top: 2,
                    right: 0,
                    left: 1,
                    front: 4,
                    back: 5
                };

                this.book.flippedright++;

                // align flipBook center container
                if (this.index == 0)
                    this.book.centerContainer.position.x = -this.book.pageWidth * 0.5;

                // add page flip interaction TO DO..



                for (mii = 0; mii < 6; mii++) {
                    // add front - back page images
                    if (mii == this.sides.front) {

   this.mats[this.sides.front] =movieMaterial[vidpg*2]


                        /*
                        */
                        this.mats[this.sides.front].name = "front";
}
                    else if (mii == this.sides.back) {
                        this.mats[this.sides.back] = movieMaterial[vidpg*2+1]
                        this.mats[this.sides.back].name = "back";
                    }
                    else {
                        this.mats[mii] = new THREE.MeshBasicMaterial({
                            color: this.pageColor
                        });
                        this.mats[mii].name = 'edge';
                    }
                }
                // call super
                // Three.js has made materials added to FaceMaterial instead of CubeGeometry
                this.$super("constructor", new THREE.CubeGeometry(this.pW, this.pH, 1, this.nfacesw, this.nfacesh, 1), new THREE.MeshFaceMaterial(this.mats));
                //this.superCall("constructor", new THREE.CubeGeometry( this.pW, this.pH, 1, this.nfacesw, this.nfacesh, 1 ), new THREE.MeshFaceMaterial(this.mats));
                this.overdraw = true;
                this.position.x = this.pW * 0.5;
                this.position.z = -this.zz * this.index;

                // flip modifiers
                this.mod = new MOD3.ModifierStack(MOD3.LibraryThree, this);
                this.pivot = new MOD3.Pivot(this.position.x, 0, 0);
                this.mod.addModifier(this.pivot);
                this.mod.collapse();
                this.bend = new MOD3.Bend(0, 0, 0);
                this.bend.constraint = MOD3.ModConstant.LEFT;
                if (this.pH > this.pW)
                    this.bend.switchAxes = true;
                this.mod.addModifier(this.bend);

                // use parallel modifier worker
                this.mod.worker(true);
            },

            book: null,
            matFront: null,
            matBack: null,
            index: null,
            pW: null,
            pH: null,
            nfacesw: 10,
            nfacesh: 10,
            mats: null,
            pageHardness: null,
            duration: 1,
            angle: null,
            force: 6,
            to: null,
            flipPt: 0.3,
            mod: null,
            bend: null,
            pivot: null,
            isFlippedLeft: false,
            isFlippedRight: true,
            flippingLeft: false,
            flippingRight: false,
            zz: 0.2,
            pageColor: null,
            sides: null,

            flipLeft: function (pt) {
                ayto = this;

                if (
                    !this.isFlippedLeft && !this.flippingLeft && !this.flippingRight &&
                    (this.index == this.book.flippedleft)
                ) {
                    if (pt != null) {
                        //this.flipPt=pt;//e.localY/this.book.pageHeight;
                    }
                    this.flippingLeft = true;
                    this.bend.setAngle((2 * this.flipPt - 1) * this.angle);
                    //console.log("flipPt" + (this.flipPt) + "   anglr " + this.angle);

                    ayto.flipText(1);

                    this.to = {
                        angle: this.rotation.y,
                        t: -1,
                        xx: 0,
                        page: this
                    };
                    //console.log("angle" + this.rotation.y);
                    new TWEEN.Tween(this.to)
                        .to({
                            angle: -Math.PI,
                            xx: 1,
                            t: 1
                        }, this.duration * 1000)
                        .onUpdate(
                        ayto.renderFlip
                    )
                        .onComplete(
                        ayto.flipFinished
                    )
                        .start();
                    this.book.flippedleft++;
                    this.book.flippedright--;
                    this.position.z = 1;
                }

                return this;
            },

            flipRight: function (pt) {
                ayto = this;
                window.ayto = this;
                if (
                    !this.isFlippedRight && !this.flippingRight && !this.flippingLeft &&
                    (this.index == totalPgs - this.book.flippedright - 1)
                ) {
                    if (pt != null) {
                        //this.flipPt=pt;//e.localY/this.book.pageHeight;
                    }
                    this.flippingRight = true;
                    this.bend.setAngle((2 * this.flipPt - 1) * this.angle);
                    this.to = {
                        angle: this.rotation.y,
                        t: -1,
                        xx: 0,
                        page: this
                    };
                    ayto.flipText(-1);

                    new TWEEN.Tween(this.to)
                        .to({
                            angle: 0,
                            xx: 1,
                            t: 1
                        }, this.duration * 1000)
                        .onUpdate(
                        ayto.renderFlip
                    )
                        .onComplete(
                        ayto.flipFinished
                    )
                        .start();
                    this.book.flippedleft--;
                    this.book.flippedright++;
                    this.position.z = 1;
                }

                return this;
            },


            renderFlip: function () {

                thisPgIndex = this.page.index;
                if ( videoArr[0].readyState === videoArr[0].HAVE_ENOUGH_DATA )
                {
                    videoImageContextArr[0].drawImage( videoArr[0], 0, 0 );
                    if ( videoTextureArr[0] )
                        videoTextureArr[0].needsUpdate = true;
                }

                if (firstFlip == 1) {
                    console.log("renderflip function");

                    firstFlip = 0;
                    for (i = 0; i < totalPgs; i++) {
                        if (i != thisPgIndex) {
                            _page = window.pages[i];
                            if (_page.index < Book.flippedleft) {
                                _page.bend.constraint = MOD3.ModConstant.RIGHT;
                                _page.bend.force = -0.0;
                                _page.bend.setAngle(0.3);
                                _page.bend.offset = 0.0;
                            } else {
                                _page.bend.constraint = MOD3.ModConstant.LEFT;
                                _page.bend.force = 0.0;
                                _page.bend.setAngle(Math.PI - 0.3);
                                _page.bend.offset = -0.0;
                            }
                            _page.mod.apply();

                        }
                    }
                }

                p2 = Math.PI * 0.5;
                // align flipBook to center
                bookcenterPos = this.page.book.centerContainer.position.x;
                numPgs = totalPgs;
                if (this.page.flippingLeft && thisPgIndex == 0 && numPgs > 1) {
                    bookcenterPos = (1 - this.xx) * bookcenterPos;
                    console.log("left");
                }
                else if (this.page.flippingLeft && thisPgIndex == numPgs - 1)
                    bookcenterPos = (1 - this.xx) * bookcenterPos + this.xx * this.page.book.pageWidth * 0.5;
                else if (this.page.flippingRight && thisPgIndex == 0)
                    bookcenterPos = (1 - this.xx) * bookcenterPos - this.xx * this.page.book.pageWidth * 0.5;
                else if (this.page.flippingRight && thisPgIndex == numPgs - 1) {

                    bookcenterPos = (1 - this.xx) * bookcenterPos;
                    console.log("RIGHTTTTTTT");
                }

                this.page.book.centerContainer.position.x = bookcenterPos;
                // flip page
                tt = (1 - Abs(this.t));
                this.page.rotation.y = this.angle;
                this.page.bend.force = ((Abs(this.angle) - p2) / p2) * tt * this.page.force * (1 - this.page.pageHardness);
                this.page.bend.offset = (1 - tt) * 0.3 + tt * 0.5;
                //console.log("angle" + this.page.bend.force + "   this.t" + this.t + "bend.offset" + this.page.bend.offset);
                this.page.mod.apply();


            },
            flipText: function (diff) {
                lastPgz = window.bkbk.flippedleft + diff;
           //     if (lastPgz==1) {videoArr[0].play()}else{videoArr[0].pause()}

                videoArr[lastPgz*2].play();

                if (videoArr[lastPgz * 2 - 1]) {
                videoArr[lastPgz*2-1].play();

                }

               // videoArr[(lastPgz+1)*2].play();
               // videoArr[(lastPgz+1)*2-1].play();
               // videoArr[(lastPgz-1)*2].play();
               //videoArr[(lastPgz-1)*2-1].play();


                $("#maintext").fadeOut("slow", function () {
                    console.log("THIS HIT HIS"+lastPgz);

                    mt_title = document.getElementById('mt_title');
                    mt_subheader = document.getElementById('mt_subheader');
                    mt_paragraph1 = document.getElementById('mt_paragraph1');
                    mt_paragraph2 = document.getElementById('mt_paragraph2');
                    if (window.nlnl != 1) {
                        if (pgs[lastPgz]){
                            $(mt_title).html(pgs[lastPgz].titleen);
                            $(mt_subheader).html(pgs[lastPgz].subheader);
                            $(mt_paragraph1).html(pgs[lastPgz].paragraph1);
                            $(mt_paragraph2).html(pgs[lastPgz].paragraph2);

                        }} else {
                        if (pgs[lastPgz]){
                            $(mt_title).html(pgs[lastPgz].titlenl);
                            $(mt_subheader).html(pgs[lastPgz].subheadernl);
                            $(mt_paragraph1).html(pgs[lastPgz].paragraph1nl);
                            $(mt_paragraph2).html(pgs[lastPgz].paragraph2nl);
                        }
                    }

                    // Animation complete.

                });

            },

            flipFinished: function () {
                console.log("flipFinished");

                lastPg = window.bkbk.flippedleft;
                if (lastPg ==     window.signPage ) {
                    if(window.signed!=1){

                        window.signed=1
                        showSign()
                    }



                }
                firstFlip = 1;
                if (this.page.flippingLeft) {
                    this.page.flippingLeft = false;
                    this.page.isFlippedLeft = true;
                    this.page.flippingRight = false;
                    this.page.isFlippedRight = false;
                    this.page.position.z = -this.page.zz * (totalPgs - this.page.index);
                }
                else if (this.page.flippingRight) {
                    this.page.flippingLeft = false;
                    this.page.isFlippedRight = true;
                    this.page.flippingRight = false;
                    this.page.isFlippedLeft = false;
                    this.page.position.z = -this.page.zz * this.page.index;
                }
                this.page.bend.force = 0.0;
                this.page.bend.setAngle(0.0);
                this.page.bend.offset = 0.0;
                this.page.mod.apply();
                currPg = "pg" + oldLastPg;

                TimeMe.stopTimer();
                if(oldLastPg>0){

videoArr[oldLastPg*2].pause();
videoArr[oldLastPg*2-1].pause();
                }

                updatePgValue(TimeMe.getTimeOnCurrentPageInSeconds(), currPg, pgID);
                // TimeMe.resetRecordedPageTime(lastPg);
                // ... Now might be a good time to upload the time spent on the page to your server!
                // ... load up new page
                oldLastPg = lastPg;

                TimeMe.setCurrentPageName(lastPg);
                TimeMe.startTimer();
                //fillstuff(window.lastPg)
                window.setTimeout(window.checkit, 60);
                maintext = document.getElementById('maintext');

                $("#maintext").fadeIn("slow", function () {
                });
            }

        });
    window.onbeforeunload = function (event) { currPg = "pg" + window.bkbk.flippedleft;
        updatePgValue(TimeMe.getTimeOnCurrentPageInSeconds(), currPg, pgID);


    }

    root.FlipBook3D = self;

    window.setTimeout(window.startit, 6000);


})(window);
