import * as flsFunctions from "./modules/functions.js";
import './owl.carousel.min.js';

flsFunctions.isWebp();

$(function() {
	//* --- Tabs --- *//
	$('ul.tabs__caption').on('click', 'li:not(.active)', function(e) {
		e.preventDefault();
	$(this)
	  .addClass('active').siblings().removeClass('active')
	  .closest('section.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});

	//* --- Slider --- *//
	$('.slider').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: ['<img src="img/team/left.svg">', '<img src="img/team/right.svg">'],
	    responsive: {
	        0:{
	            items:1
	        },
	        576:{
	            items:2
	        },
	        768: {
	        	items:3
	        },
	        992:{
	            items:4
	        }
	    }
	})

	$('.reviews').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: true,
	    navText: ['<img src="img/team/left.svg">', '<img src="img/team/right.svg">'],
	    responsive: {
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	})

	$('.cards--others').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: ['<img src="img/course/slider/left.svg">', '<img src="img/course/slider/right.svg">'],
	    responsive: {
	        0:{
	            items:1
	        },
	        768: {
	        	items:1
	        },
	        992:{
	            items:2
	        }
	    }
	})

	$('.event-cards').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: ['<img src="img/course/slider/left.svg">', '<img src="img/course/slider/right.svg">'],
	    responsive: {
	        0:{
	            items:1
	        },
			576:{
	            items:1
	        },
	        768: {
	        	items:2
	        },
	        992:{
	            items:3
	        }
	    }
	})

	$('.posts--post').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: ['<img src="img/course/slider/left.svg">', '<img src="img/course/slider/right.svg">'],
	    responsive: {
	        0:{
	            items:1
	        },
			576:{
	            items:1
	        },
	        768: {
	        	items:3
	        },
	        992:{
	            items:3
	        }
	    }
	})

	//* --- Accordion --- *//
	const lessons = document.querySelectorAll('.lesson__item');
	lessons.forEach(lesson => {
		lesson.addEventListener('click', () => {
			lesson.classList.toggle('active');
		})
	})

	//* --- Block views --- *//
	const list = document.querySelector('.list');
	const grid = document.querySelector('.grid');
	const listBlock = document.querySelector('.events');
	const gridBlock = document.querySelector('.events-cards');

	if (window.location.pathname == '/events.html') {
		list.addEventListener('click', (e) => {
			e.preventDefault();
			listBlock.classList.add('active');
			if (gridBlock.classList.contains('active')) {
				gridBlock.classList.remove('active');
			}
		})

		grid.addEventListener('click', (e) => {
			e.preventDefault();
			gridBlock.classList.add('active');
			if (listBlock.classList.contains('active')) {
				listBlock.classList.remove('active');
			}
		})
	}

	//* --- Pagenation --- *//
	const buttons = document.querySelectorAll('.page__link');
	const destruction = () => {
		for(var button of buttons) {
			button.classList.remove('active');
		}
	}

	buttons.forEach((button) => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			destruction();
			button.classList.add('active');		
		});
	});

	//* --- Courses tabs --- *//
	const coursesTabs = document.querySelectorAll('.product-tabs__link');
	const prevent = () => {
		for(var tab of coursesTabs) {
			tab.classList.remove('active');
		}
	}

	coursesTabs.forEach((tab) => {
		tab.addEventListener('click', (e) => {
			e.preventDefault();
			prevent();
			tab.classList.add('active');		
		});
	});
	
	//* --- Tabu on submitting the form --- *//
	const form = document.querySelector('.notify-form');
	const checkbox = document.getElementById('privacy');
	if (window.location.pathname == '/contacts.html') {
		form.addEventListener('submit', (e) => {
			if (checkbox.checked === false) {
				alert('To send a message, accept the terms of the agreement');
				e.preventDefault();
			}
		})
	}

	//* --- Modal Window --- *//
	class LogModal {
	/**
	 * When creating an instance of a class, we pass
	 * js object with settings. It becomes available
	 * in class constructor as props variable
	*/
		constructor(props) {
			/**
				* For convenience, some properties can be omitted
				* We have to fill them with initial values
				* This can be done using the Object.assign method
        	*/
			let defaultConfig = {
				linkAttributeName: 'data-logmodal',
				// ... other properties
			}
			this.config = Object.assign(defaultConfig, props);
			this.init();
		}

		/**
			* The _shadow property will be set to a div with a visual
    		* backing. It is made static, because while creating
     		* multiple instances of the class, this underlay is only needed
     		* one
		*/
		static _shadow = false;

		init() {
			// Create triggers and other variables
			this.isOpened = false; // opened window or not
			this.openedWindow = false; // link to open .log-modal
			this._modalBlock = false; // link to open .log-modal__window
			this.starter = false, // reference to the "opener" element of the current window
			// (it's needed to return focus to it)
			this._nextWindows = false; // link to .log-modal to open
			this._scrollPosition = 0; // current scroll 
			this._focusElements = [
				'a[href]',
				'area[href]',
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				'select:not([disabled]):not([aria-hidden])',
				'textarea:not([disabled]):not([aria-hidden])',
				'button:not([disabled]):not([aria-hidden])',
				'iframe',
				'object',
				'embed',
				'[contenteditable]',
				'[tabindex]:not([tabindex^="-"])'
			]; // All css selectors that can be focused

			// Create only one pad and paste it at the end of body
			if (!LogModal._shadow) {
            	LogModal._shadow = document.createElement('div');
            	LogModal._shadow.classList.add('log-modal__shadow');
            	document.body.appendChild(LogModal._shadow);
        	}

        	// Launch the event handling method, see below
        	this.eventsFeeler();
		}

		eventsFeeler() {
			/**
				* It is necessary to process the opening of windows by clicking on elements with
				* a data attribute which we set in assembly - this.config.linkAttributeName
				* Here we are using event delegation to use one click
				* just an event handler on the html element
         	*/
         	document.addEventListener('click', function(e) {
         		/**
         			* Determine if the click hits the element that opens the window
         		*/
         		const clickedlink = e.target.closest("[" + this.config.linkAttributeName + "]");
         		/**
         			* if true then find * a suitable window, fill in the properties
             		* _nextWindows and _starter and call
             		* open method (see below)
             	*/
             	if (clickedlink) { 
	                e.preventDefault();
	                this.starter = clickedlink;
	                let targetSelector = this.starter.getAttribute(this.config.linkAttributeName);
	                this._nextWindows = document.querySelector(targetSelector);
	                this.open();
	                return;
            	}
            	/**
					* if the event is fired on an element
					* with data-attribute data-logclose,
					* means call the window close method
            	*/
            	if (e.target.closest('[data-logclose]')) {
                	this.close();
                	return;
            	}
         	}.bind(this));   	
			/** By default, in the event handler at this
				* the selector on which events are processed is placed.
				* So we need to manually set this to our
				* an instance of the class we write with .bind().
			*/ 

			document.addEventListener('mousedown', function(e) {
				/**
					* Check on .log-modal__wrap,
					* and mark it in the this._overlayChecker
				*/ 
				if (!e.target.classList.contains('log-modal__wrap')) return;
				this._overlayChecker = true;
			}.bind(this));
			
			document.addEventListener('mouseup', function (e) {
				/**
					* check on mouse was released under .log-modal__wrap,
					* if true, than close the window and reset
					* this._overlayChecker anyway
				*/
				if (this._overlayChecker && e.target.classList.contains('log-modal__wrap')) {
					e.preventDefault();
					!this._overlayChecker;
					this.close();
					return;
				}
				this._overlayChecker = false;
			}.bind(this));

			// Process the key escape and tab
			window.addEventListener("keydown", function(e) {   
            	//close window on escape
            	if (e.which == 27 && this.isOpened) {
                	e.preventDefault();
                	this.close();
                	return;
            	}

            	/** Call the method to control focus on Tab
             		* And put all responsibility on him.
             		* (will create it later)
             	*/ 
            	if (e.which == 9 && this.isOpened) {
                	this.focusCatcher(e);
                	return;
            	}
        	}.bind(this));
		}

		open(selector) {
			this.openedWindow = this._nextWindows;
			this._modalBlock = this.openedWindow.querySelector('log-modal__window');
			/** Call the scroll control method
         		* it will block/unblock
         		* page depending on this.isOpened properties
         	*/
         	this._bodyScrollControl();
        	LogModal._shadow.classList.add("log-modal__shadow--show");
        	this.openedWindow.classList.add("log-modal--active");
        	this.openedWindow.setAttribute('aria-hidden', 'false');

        	// this.focusContol(); // Call the focus transfer method (see below)
        	this.isOpened = true;
		}

		close() {
			/**
				* Method for closing the current window.
			*/
			if (!this.isOpened) {
            	return;
        	}
        	this.openedWindow.classList.remove("log-modal--active");
        	LogModal._shadow.classList.remove("log-modal__shadow--show");
        	this.openedWindow.setAttribute('aria-hidden', 'true');

        	// Return focus to the element that opened the window
        	// this.focusContol();

        	// Return scroll
        	this._bodyScrollControl();
        	this.isOpened = false;
		}

		 _bodyScrollControl() {
		 	let html = document.documentElement;
		 	if (this.isOpened === true) {
		 		// Page unlock
		 		html.classList.remove("log-modal__opened");
            	html.style.marginRight = "";
            	window.scrollTo(0, this._scrollPosition);
            	html.style.top = "";
            	return;
		 	}
			
			let marginSize = window.innerWidth - html.clientWidth;
			if (marginSize) {
				html.style.marginRight = marginSize + "px";
			} 

		 	// Page blocking
		 	this._scrollPosition = window.pageYOffset;
        	html.style.top = -this._scrollPosition + "px";
        	html.classList.add("log-modal__opened");
			html.style.marginRight = "";
		}

		focusContol() {
			/** The method transfers focus
				* from the element of the opening window
     			* to the window itself, and back when the window closes
			*/
			const nodes = this.openedWindow.querySelectorAll(this._focusElements);
    		if (this.isOpened && this.starter) {
        		this.starter.focus();
    		} else {
        		if (nodes.length) nodes[0].focus();
    		}
		}

		focusCatcher(e) {
			// Find all elements that can be focused 
			const nodes = this.openedWindow.querySelectorAll(this._focusElements);

			// Сonvert to array
			const nodesArray = Array.prototype.slice.call(nodes);
		
			// If there is no focus in the window, insert focus on the first elem
			if (!this.openedWindow.contains(document.activeElement)) {
				nodesArray[0].focus();
				e.preventDefault();
			} else {
				const focusedItemIndex = nodesArray.indexOf(document.activeElement)
				if (e.shiftKey && focusedItemIndex === 0) {
					// Move focus to last element
					nodesArray[nodesArray.length - 1].focus();
					e.preventDefault();
				}
				if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
					// Move focus to first element
					nodesArray[0].focus();
					e.preventDefault();
				}
			}
		}
	} // LogModal
	const logModal = new LogModal({
    	linkAttributeName: 'data-logmodal',
	});
	const regModal = new LogModal({
		linkAttributeName: 'data-regmodal', 
	});

	//* --- Hide Password --- *//
	const eyes = document.querySelectorAll('.password-control'),
		passwordLog = document.getElementById('pass-log'),
		passwordReg = document.getElementById('pass-reg'),
		passwordConfirm = document.getElementById('pass-reg2');
	eyes.forEach((eye) => {
		eye.addEventListener('click', (e) => {
			e.preventDefault();
			show_password(e.target);
		})
	})

	function show_password(elem) {
		elem.classList.toggle('view');
		if (elem.id === 'log') {
			if (passwordLog.getAttribute('type') === 'password') {
				passwordLog.setAttribute('type', 'text');
			} else {
				passwordLog.setAttribute('type', 'password');	
			}
		} if (elem.id === 'reg') {
			if (passwordReg.getAttribute('type') === 'password') {
				passwordReg.setAttribute('type', 'text');
			} else {
				passwordReg.setAttribute('type', 'password');	
			}
		} if (elem.id === 'reg2') {
			if (passwordConfirm.getAttribute('type') === 'password') {
				passwordConfirm.setAttribute('type', 'text');
			} else {
				passwordConfirm.setAttribute('type', 'password');	
			}
		}
	}

	//* --- Compare password --- *//
	const regForm = document.getElementById('reg-form'),
		pass = regForm.querySelectorAll('#pass-reg, #pass-reg2');

	regForm.addEventListener('submit', function(e) {
		let err = !(pass[0].value && (pass[0].value == pass[1].value))
		pass[1].setAttribute("title", err ? alert('Сonfirmation error: Passwords are not identical!') : '');
		err && e.preventDefault();
	}, false);

	pass[1].addEventListener('input', function(e) {
		let err = !(pass[0].value == pass[1].value)
		pass[1].setAttribute("title", err ? 'don\'t match' : '');
	}, false);	
});