/**
 * JAVASCRIPT DEVELOPER DOCUMENTATION
 *
 * Enterprise is a powerful and customizable theme designed for large-scale e-commerce stores. Built
 * using Web Components, it offers a highly modular architecture that makes customization and
 * maintenance easier than ever. In addition, Enterprise is optimized for speed, ensuring that your
 * store runs as fast as possible to provide your customers with a seamless shopping experience.
 *
 * If you would like to add your own JS to Enterprise, we recommend using this file and referencing
 * it using Theme Settings > Advanced > Custom HTML.
 *
 * As a brief overview, Enterprise:
 *  - Broadcasts many JS events.
 *  - Is built using Web Components.
 *  - Follows a 'code splitting' architecture.
 *  - Is completely custom built (no JS libraries other than instant.page)
 *  - Has a number of JS utilities.
 *
 *
 *
 * =================================================================================================
 * Custom JavaScript Events
 * =================================================================================================
 *
 * Enterprise broadcasts many custom events for ease of extensibility, detailed in this section.
 *
 * When in the Theme Editor, the details of each custom event will be logged out in the Dev Tools
 * console everytime it is triggered.
 *
 * Events are named in the following convention: ["on/dispatch"]:[subject]:[action] (where
 * 'dispatch' will trigger an event to occur, and 'on' indicates an event has occurred).
 *
 * All 'Return data' detailed in this section is returned within the 'event.detail' object.
 *
 * The available events are:
 *  1.  on:variant:change
 *  2.  on:cart:add
 *  3.  on:cart:error
 *  4.  on:line-item:change
 *  5.  on:cart-drawer:before-open
 *  6.  on:cart-drawer:after-open
 *  7.  on:cart-drawer:after-close
 *  8.  on:quickbuy:before-open
 *  9.  on:quickbuy:after-open
 *  10. on:quickbuy:after-close
 *  11. dispatch:cart-drawer:open
 *  12. dispatch:cart-drawer:refresh
 *  13. dispatch:cart-drawer:close
 *  14. on:debounced-resize
 *  15. on:breakpoint-change
 *
 * -------------------------------------------------------------------------------------------------
 * 1) on:variant:change
 * -------------------------------------------------------------------------------------------------
 * Fires whenever a variant is selected (e.g. Product page, Quickbuy, Featured Product etc).
 *
 * How to listen:
 * document.addEventListener('on:variant:change', (event) => {
 *  // your code here
 * });
 *
 * Returned data:
 *  - form: the product form content
 *  - variant: the selected variant object
 *  - product: the product object (includes a list of all variants)
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 2) on:cart:add
 * -------------------------------------------------------------------------------------------------
 * Fires when a variant has been added to the cart, where it didn't exist in the cart before. This
 * event does not fire when the added variant was already in the cart. To listen for this, see the
 * on:line-item:change event.
 *
 * How to listen:
 * document.addEventListener('on:cart:add', (event) => {
 *   // your code here
 * });
 *
 * Returned data:
 *   - cart: the new cart object after the variant was added
 *   - variantId: id of the variant that was just added to the cart
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 3) on:line-item:change
 * -------------------------------------------------------------------------------------------------
 * Fires when the quantity of an item already in the cart is updated. Note, if the 'newQuantity' is
 * 0, this indicates the item was removed from that cart.
 *
 * Note, when adding a variant to the cart - this event will fire if that variant is already in the
 * cart (i.e. the quantity is incremented). In this situation, 'on:cart:add' will not fire.
 *
 * How to listen:
 * document.addEventListener('on:line-item:change', (event) => {
 *   // your code here
 * });
 *
 * Returned data:
 *   - cart: the new cart object after the quantity change was completed
 *   - variantId: id of the variant that was just updated
 *   - newQuantity: new quantity of the line item
 *   - oldQuantity: old quantity of the line item
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 4) on:cart:error
 * -------------------------------------------------------------------------------------------------
 * Fires when an action related to the cart has failed, for example adding too much quantity of an
 * item to the cart.
 *
 * How to listen:
 * document.addEventListener('on:cart:error', (event) => {
 *   // your code here
 * });
 *
 * Returned data:
 *   - error: the error message
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 5) on:cart-drawer:before-open
 * -------------------------------------------------------------------------------------------------
 * Fires before the cart drawer opens.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:before-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 6) on:cart-drawer:after-open
 * -------------------------------------------------------------------------------------------------
 * Fires after the cart drawer has finished opening.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:after-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 7) on:cart-drawer:after-close
 * -------------------------------------------------------------------------------------------------
 * Fires after the cart drawer has finished closing.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:after-close', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 8) on:quickbuy:before-open
 * -------------------------------------------------------------------------------------------------
 * Fires before the quick buy drawer opens.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:before-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 9) on:quickbuy:after-open
 * -------------------------------------------------------------------------------------------------
 * Fires after the quick buy drawer has finished opening.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:after-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 10) on:quickbuy:after-close
 * -------------------------------------------------------------------------------------------------
 * Fires after the quick buy drawer has finished closing.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:after-close', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 11) dispatch:cart-drawer:open
 * -------------------------------------------------------------------------------------------------
 * Opens the cart drawer (if enabled in the Theme Settings).
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:open'));
 *
 * You can optionally pass in a 'detail' object with a property of 'opener', which specifies the DOM
 * element that should be focussed on when the drawer is closed.
 *
 * Example:
 * document.getElementById('header-search').addEventListener('keydown', (evt) => {
 *   if (evt.keyCode === 67) {
 *     evt.preventDefault();
 *     document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:open', {
 *       detail: {
 *         opener: evt.target
 *       }
 *     }));
 *   }
 * });
 *
 * In this example, we attach a keydown listener to the search input in the header. If the user
 * presses the 'c' key, it prevents the default behavior (which would be to type the letter 'c' in
 * the input) and dispatches the 'dispatch:cart-drawer:open' event with a 'detail' object that
 * specifies the search input as the opener. When the cart drawer is closed, focus is returned to
 * the search input.
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 12) dispatch:cart-drawer:refresh
 * -------------------------------------------------------------------------------------------------
 * Refreshes the contents of the cart drawer.
 *
 * This event is useful when you are adding variants to the cart and would like to instruct the
 * theme to re-render the cart drawer.
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:refresh', {
 *   bubbles: true
 * }));
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 13) dispatch:cart-drawer:close
 * -------------------------------------------------------------------------------------------------
 * Closes the cart drawer.
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:close'));
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 14) on:debounced-resize
 * -------------------------------------------------------------------------------------------------
 * Fires when the viewport finishes resizing (debounced to 300ms by default).
 *
 * How to listen:
 * window.addEventListener('on:debounced-resize', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 15) on:breakpoint-change
 * -------------------------------------------------------------------------------------------------
 * Fires when the breakpoint of the viewport changes. See the 'Media Queries' section in this file
 * for more.
 *
 * Example:
 * window.addEventListener('on:breakpoint-change', (event) => {
 *  if (theme.mediaMatches.md) {
 *   console.log('we are not on mobile');
 *  }
 * });
 *
 *
 *
 * =================================================================================================
 * Web Components
 * =================================================================================================
 *
 * Enterprise utilizes Web Components to the fullest.
 *
 * Web Components are a set of standardized APIs that allow developers to create custom, reusable
 * HTML elements that can be used across different web pages and applications.
 * Web Components consist of three main technologies: Custom Elements, Shadow DOM and HTML
 * Templates.
 *
 * See Mozilla for more: https://developer.mozilla.org/en-US/docs/Web/Web_Components
 *
 *
 *
 * =================================================================================================
 * Third-Party JavaScript Dependencies
 * =================================================================================================
 *
 * Enterprise only has one third-party dependency: instant.page (https://instant.page/).
 *
 * It's included locally and is only active if it has been enabled in
 * 'Theme Settings > Advanced > Preload links on hover'.
 *
 * Instant.page is a JavaScript library that speeds up page loads by preloading links as soon as the
 * customer hovers over them.
 *
 *
 *
 * =================================================================================================
 * Code Splitting
 * =================================================================================================
 * We followed the ‘code splitting’ technique when building Enterprise.
 *
 * Code splitting consists in writing JavaScript (and CSS)in a modularized way within typically
 * small, more manageable files that can be loaded on-demand, as needed. The idea is to improve the
 * performance of our theme by reducing the amount of code that needs to be loaded upfront.
 *
 * If the customer is visiting a specific page of the theme that requires certain JavaScript
 * functionality, only the code needed for that page will be loaded, rather than one large
 * JavaScript file containing largely unused code. For example, the file media-gallery.js will
 * only be loaded if there is a media gallery on the page.
 *
 * Shopify uses HTTP/2, which is the newer version of the HTTP protocol used to deliver web content.
 * HTTP/2 supports multiplexing, which means that multiple requests can be sent over a single
 * connection at the same time - meaning multiple JS files are essentially served at the speed of a
 * single file.
 *
 * The only JS file which is served on every page in Enterprise is 'main.js'. Main.js contains
 * utility JS which is likely to be needed by many scripts. This is outlined more in the next
 * section.
 *
 *
 *
 * =================================================================================================
 * Utilities
 * =================================================================================================
 * Enterprise provides a few utility utilities, contained in main.js. Some of the key ones are
 * outlined below. See main.js for more.
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 1) Lazy Loading
 * -------------------------------------------------------------------------------------------------
 * Lazy loading is a technique for delaying the loading of certain elements until they are needed,
 * which can help improve page load times.
 *
 * We use three functions used for lazy loading images and scripts in our theme:
 *
 *  - setImageSources function - copies the data-src and data-srcset attributes of lazy loaded
 *    images to their src and srcset attributes.
 *  - initLazyImages function - uses the IntersectionObserver API to lazy load images when needed.
 *  - initLazyScript function - only loads a script when a specific element is scrolled into view.
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 2) Cookies
 * -------------------------------------------------------------------------------------------------
 * Cookies are small pieces of data that can be stored on a user's computer. They can be useful for
 * tracking user activity, remembering user preferences or other similar purposes.
 *
 * We use three functions to manage cookies:
 *
 *  - setCookie function - sets a cookie with a given name, value and number of days until it
 *  should expire.
 *  - getCookie function - takes in the name of a cookie to retrieve its value.
 *  - deleteCookie function - takes in the name of a cookie to delete it.
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 3) Media Queries
 * -------------------------------------------------------------------------------------------------
 * The theme creates a theme.mediaMatches object (in theme.liquid) for several key screen sizes
 * specified in our theme, and adds listeners for each media query.
 *
 * These are:
 *
 * mediaQueries: {
 *  sm: '(min-width: 600px)',
 *  md: '(min-width: 769px)',
 *  lg: '(min-width: 1024px)',
 *  xl: '(min-width: 1280px)',
 *  xxl: '(min-width: 1536px)',
 *  portrait: '(orientation: portrait)'
 * }
 *
 * If a breakpoint is crossed, the mediaMatches values are updated and an 'on:breakpoint-change'
 * event is dispatched.
 *
 * You can request the entire theme.mediaMatches object to check which media queries are currently
 * matched. In this case, the returned data will be an object with the names of the media queries as
 * keys, and boolean values indicating whether they are currently matched or not.
 *
 * Example:
 *
 * {
 *  sm: true,
 *  md: true,
 *  lg: true,
 *  xl: true,
 *  xxl: false,
 *  portrait: false
 * }
 *
 * You can reference a specific media query to check if it's currently matched by using:
 * theme.mediaMatches.lg.
 *
 * To check if you're on mobile you can use:
 * !theme.mediaMatches.md
 *
 * If you want to perform some action when the breakpoint changes, you can listen for the
 * breakpoint-change event on the window object.
 *
 * Example:
 * window.addEventListener('on:breakpoint-change', (event) => {
 *  // your code here
 * });
 *
 * =================================================================================================
 *
 * Have fun! - The Clean Canvas Development Team.
 */

//custom js

document.addEventListener("DOMContentLoaded", () => {

   window.onload = function() {
        if (window.jQuery) {
          let $ = window.jQuery;
          $(function() {
            $(".custom_properties #date").datepicker({
            minDate: +10,
            maxDate: '+2M',
            beforeShowDay: $.datepicker.noWeekends
          });
        });
      }
    }

    $(document).on("click",".engraving-variants .opt-btn",function() {
      $('.custom_properties .val').val('');
      var input_val = $(this).attr('variant_val');
      if(input_val == 'val-1'){
        $('.custom_properties .Image , .custom_properties .Text').addClass('hide');
         $('.custom_properties .Image .val , .custom_properties .Text .val').removeAttr('required');
      }else{
         $('.custom_properties .Image , .custom_properties .Text').removeClass('hide');
         $('.custom_properties .Image .val , .custom_properties .Text .val').attr('required', 'required');
      }
    });
    if(document.querySelectorAll('.carpel_galaxy_customization').length > 0){
      $(document).find('.engraving-variants .opt-btn').trigger('click');
    }
  
    $( ".main-nav__child, .main-menu__content" ).mouseleave(function() {
      $('.overlay').removeClass('overlay--nav, is-visible');
      $('.secondary-menu li details').attr('open', '').removeClass('is-open');
      $('body').removeClass('overflow-hidden');
    });

     $(document).on("change", ".itgcarrierselect", function () {
         var a = $(this).val();
         $('.itg-carrier-account-detail-field select.itgcarriermethodselect').each(function () {
           var b = $(this).attr("data-attr-value");
            if(a == b){
              $(this).show();
            }else{
              $(this).hide();
            }
        });
        if($(this).val() === 'Other'){
          $(document).find(".itg_otherfiled_show").addClass("show");
          $(document).find(".itg_otherfiled_hide").addClass("hide");
        }else{
          $(document).find(".itg_otherfiled_show").removeClass("show");
          $(document).find(".itg_otherfiled_hide").removeClass("hide");
        }
      });

       if(document.querySelectorAll('.itg--template_cart').length > 0){

            let attrval = document.querySelector('.itg_shipping_show_hide').value;
            if(attrval){
                 fetch('/cart/update.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    attributes: {
                      'Shipping_Account': attrval
                    }
                  })
                }).then(res => res.json())
                .then(cart => {
                  //console.log('Cart attribute updated:', cart.attributes);
                }).catch(err => console.error('Error updating cart attribute:', err));
             }
             document.addEventListener("change", function (event) {
               if (event.target.matches(".itg_shipping_show_hide")) {
                 const shippingDiv = document.querySelector(".itg-shipping-checkbox-div");
                 function updatepro(attrval){
                     fetch('/cart/update.js', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          attributes: {
                            'Shipping_Account': attrval
                          }
                        })
                      }).then(res => res.json())
                      .then(cart => {
                        console.log('Cart attribute updated:', cart.attributes);
                      }).catch(err => console.error('Error updating cart attribute:', err));
                  }
                 
                 if (event.target.checked) {
                      event.target.setAttribute("value",'true');
                      updatepro('true');
                      shippingDiv.style.display = "block";
                      shippingDiv.style.maxHeight = "500px";
                      shippingDiv.style.transition = "max-height 0.5s ease-in";
                  } else {
                      event.target.setAttribute("value",'false');
                      updatepro('false');
                      shippingDiv.style.maxHeight = "0";
                      shippingDiv.style.overflow = "hidden";
                      shippingDiv.addEventListener("transitionend", function hide() {
                        shippingDiv.style.display = "none";
                        shippingDiv.removeEventListener("transitionend", hide);
                      });
                  }
               }
             });
         
              const datePicker = document.getElementById("html_datepicker");
              const today = new Date().toISOString().split('T')[0];
              datePicker.min = today; 
              datePicker.value = today;
              datePicker.addEventListener("change", function() {
                const dateText = this.value;
                const selectDate = document.getElementById('select_date');
                if(dateText){
                  selectDate.setAttribute('name', 'attributes[Date]');
                  selectDate.value = dateText;
                }else{
                  selectDate.removeAttribute('name');
                  selectDate.value = '';
                }
              });

              if(localStorage.getItem("pono")){
                  let ponumber = localStorage.getItem("pono");
                  document.querySelector('.cart_ponumber').value = ponumber;
              }
              document.querySelector('.cart_ponumber').addEventListener('change', function() {
                 let getno = this.value;
                 if(getno){
                   localStorage.setItem("pono", getno);
                 }else{
                   localStorage.removeItem('pono');
                 }
              });
       }

     $(document).on('click', '.accountUrlCustom', function(event) {
        event.preventDefault();
        var hrefAccount = $(this).attr('href');
        window.location.href = hrefAccount;
     });
  
    $(document).on('click', '#SwymGrSaveShipping', function(event) {
      event.preventDefault();  
        const customerAccessToken = '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';
        var customerId = $(this).attr("data-customer");
        var carrier = $('.itgcarrierselect').val();
        var shippingMethod = '';
        var selectedCarrier = $('.itgcarrierselect').val();
        var carrierKey;
        if (selectedCarrier === 'UPS') {
            carrierKey = 'shipping_carrier_ups';
        } else if (selectedCarrier === 'USPS') {
            carrierKey = 'shipping_carrier_usps';
        } else if (selectedCarrier === 'FedEx') {
            carrierKey = 'shipping_carrier_fedex';
        } else if (selectedCarrier === 'Other') {
            carrierKey = 'shipping_carrier_other';
        } else {
            carrierKey = '';
        }
        $('.itgcarriermethodselect').each(function () {
          if ($(this).val() !== 'null' && $(this).val() !== 'Please Select' && $(this).val() !== '') {
            if ($(this).prop('selected')) {}
              shippingMethod = $(this).val();
          }
        });
        
        var accountNumber = $('input[name="attributes[Shipping Account Number]"]').val();
        var zipCode = $('input[name="attributes[Zip code]"]').val();
        if (carrier === 'BLANK' || shippingMethod === '' || accountNumber === '' || zipCode === '') {
          alert('Please fill in all fields.');
          return;
        }
        var result = carrier + ', ' + shippingMethod + ', ' + accountNumber + ', ' + zipCode;
         var shippingDetails = result;
         $.ajax({
              url: 'https://dev.shopifyexperthelp.com/app/devb/rsdesign/r-s-design-shipping-details/update_shipping_metafield.php',
              type: 'POST',
              dataType: 'json',
              data: {
                  customerId: customerId,
                  shippingDetails: shippingDetails,
                  carrierKey: carrierKey
              },
              success: function(response) {
                  document.querySelector('.save_detail_res').style.display = 'block';
                  setTimeout(function(){
                     document.querySelector('.save_detail_res').style.display = 'none';
                  }, 5000);
                  if (response.success) {
                  } else {
                  }
              },
              error: function(xhr, status, error) {
                  console.error('AJAX request failed:', error);
              }
          });
    });

    $(document).on('click', '#Custom_Checkout', function(event) {
        event.preventDefault();
        var cart_datepicker = $(document).find('.cart_datepicker').val();
        var cart_ponumber = $(document).find('.cart_ponumber').val();
        if(cart_datepicker == '' && cart_ponumber == ''){
          alert('Please Fill Date & PO Number.');
          return false;
        }else if(cart_datepicker == ''){
           alert('Please Fill Need by Date.');
           return false;
        }else if(cart_ponumber == ''){
          alert('Please Fill PO Number.');
          return false;
        }else{
          $('button.btn[name="checkout"]').click();
        }
    });
    if(document.querySelectorAll('.carpel_galaxy_customization').length > 0){

         const galaxySel = document.getElementById('itg_default_selection');
         if(galaxySel){
           let getName = galaxySel.getAttribute('data-name');
           let getVal = galaxySel.value;
           galaxySel.setAttribute("name", getVal ? getName : '');
           const selectElements = document.querySelectorAll('.form-select-check');
           const inputElements = document.querySelectorAll('.form-input--small');
           const filedGalaxyElements = document.querySelectorAll('.filed_galaxy');
           if (getVal === 'No') {
                selectElements.forEach(element => {
                    element.setAttribute("name", '');
                    element.selectedIndex = 0;
                    element.removeAttribute("required");
                });
                inputElements.forEach(element => {
                    element.setAttribute("name", '');
                    element.value = '';
                });
                filedGalaxyElements.forEach(hideDiv => hideDiv.style.display = 'none');
            }else {
                filedGalaxyElements.forEach(showDiv => showDiv.style.display = 'block');
                selectElements.forEach(element => {
                   element.setAttribute("required", "true");
                });
            }
         }
        
    
        document.querySelectorAll('.form-select').forEach(function(galaxySel) {
           galaxySel.addEventListener('change',function(){
               let getName = galaxySel.getAttribute('data-name');
               let getVal = galaxySel.value;
               galaxySel.setAttribute("name", getVal ? getName : '');
               const selectElements = document.querySelectorAll('.form-select-check');
               const inputElements = document.querySelectorAll('.form-input--small');
               const filedGalaxyElements = document.querySelectorAll('.filed_galaxy');
                if(getName == 'properties[Month]' || getName == 'properties[Day]' || getName == 'properties[Year]'){
                }else{
                   if (getVal === 'No') {
                        selectElements.forEach(element => {
                            element.setAttribute("name", '');
                            element.selectedIndex = 0;
                            element.removeAttribute("required");
                        });
                        inputElements.forEach(element => {
                            element.setAttribute("name", '');
                            element.value = '';
                        });
                        filedGalaxyElements.forEach(hideDiv => hideDiv.style.display = 'none');
                    }else {
                        filedGalaxyElements.forEach(showDiv => showDiv.style.display = 'block');
                        selectElements.forEach(element => {
                           element.setAttribute("required", "true");
                        });
                    }
                 }
           });
        });
        document.querySelectorAll('.form-input').forEach(function(inputSel) {
           inputSel.addEventListener('keyup',function(){
              let getName = inputSel.getAttribute('data-name');
              let getVal = inputSel.value;
              if(getVal){
                inputSel.setAttribute("name",getName);
              }else{
                inputSel.setAttribute("name",'');
              }
           });
        });
    }


   //document.addEventListener('contextmenu', event => event.preventDefault());

   if(document.querySelectorAll('.custom_sort_collection').length > 0){
       $(document).on("click",".itg_filter__content",function() {
          let searchParams = $(this).attr('data-filter');
          history.pushState(searchParams, "", searchParams);
          setTimeout(function() {
              window.location.reload()
          }, 200);
      });
    }

    
    if(document.querySelectorAll('.pdf_field').length > 0){
      document.addEventListener("change", function (event) {
          if (event.target.id === "pdf_file") {
             let inputElement = event.target;
             if(inputElement.value){
                 document.querySelectorAll('.addLoader').forEach(el => el.classList.add('it_loading'));
                 let form_data = new FormData();
                 let file_data = inputElement.files[0];
                 form_data.append('image', file_data);
                 var xhr = new XMLHttpRequest();
                 xhr.open("POST", "https://dev.shopifyexperthelp.com/app/project_app/r-s-design/file.php", true);
                 xhr.onload = function () {
                   if(xhr.status === 200) {
                      let data_new = xhr.responseText;
                      document.querySelector("#pdf_final").insertAdjacentHTML("beforeend",`<input type="hidden" name="attributes[Pdf File]" value="${data_new}">`);
                      document.querySelectorAll('.addLoader').forEach(el => el.classList.remove('it_loading'));
                   }else{
                      document.querySelectorAll('.addLoader').forEach(el => el.classList.remove('it_loading'));
                   }
                 }
                 xhr.onerror = function () {};
                 xhr.send(form_data);
             }else{}
          }
      });
   }
});