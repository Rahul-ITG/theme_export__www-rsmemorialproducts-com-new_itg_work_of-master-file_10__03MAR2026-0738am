const handleChange = (event) => {
  if (event) {
    var newValue = $(event.target).val();
  } else {
    var newValue = $('.SwymGrTemplateOption.SwymGrSelected input:checked').val();
  }

  if (newValue === undefined) {
    return;
  }
  $('#product-media').removeClass('ImageLeftContentRight ContentAboveImageBelow ContentLeftImageRight ContenAtImgMiddleSentimentLast');
  $('.media-thumbs__item img[alt="Default-template"]').parents('button').trigger('click');
  if (newValue === 'image-left-content-right') {
      $('#product-media').addClass('ImageLeftContentRight');
  } else if (newValue === 'content-above-image-below') {
      $('#product-media').addClass('ContentAboveImageBelow'); // Replace with your class name
  } else if (newValue === 'content-left-image-right') {
      $('#product-media').addClass('ContentLeftImageRight'); // Replace with your class name
  } else if (newValue === 'content-image-sentiment-last') {
      $('#product-media').addClass('ContenAtImgMiddleSentimentLast');
  }
};
handleChange();
$(document).on('change', '.SwymGrTemplateOption input', function(event) {
  handleChange(event);
});

// Function to toggle SwymGrOptionsList visibility
function toggleSwymGrOptionsList(selectElement) {
  const SwymGrOptionsList = selectElement.querySelector('.SwymGrOptionsList');
  SwymGrOptionsList.style.display = SwymGrOptionsList.style.display === 'block' ? 'none' : 'block';
}

// Function to update the selected option
function selectOption(event, selectElement) {
  const selectedValue = event.target.innerText;
  selectElement.querySelector('span').innerText = selectedValue;
  selectElement.classList.remove('SwymGrActiveOpt');
}

// Attach event listeners to each custom select
document.querySelectorAll('.SwymGrCustomSelect').forEach(select => {
  select.addEventListener('click', function(event) {
    if (!select.classList.contains('SwymGrActiveOpt')) {
      document.querySelectorAll('.SwymGrCustomSelect').forEach(el => el.classList.remove('SwymGrActiveOpt'));
    }
    select.classList.toggle('SwymGrActiveOpt');
    toggleSwymGrOptionsList(select);
  });

  select.querySelectorAll('.SwymGrOptionsList li').forEach(option => {
    option.addEventListener('click', function(event) {
      selectOption(event, select);
    });
  });
});

// Close SwymGrOptionsList when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.SwymGrCustomSelect')) {
    document.querySelectorAll('.SwymGrCustomSelect').forEach(select => {
      select.classList.remove('SwymGrActiveOpt');
      const SwymGrOptionsListHide = select.querySelector('.SwymGrOptionsList');
      SwymGrOptionsListHide.style.display = SwymGrOptionsListHide.style.display === 'block' ? 'none' : 'none';
    });
  }
});


// ------------------------------------------ Newly Added ------------------------------------------
$(document).ready(function(){
  let ActiveVariantId = $('.SwymGrPositionSticky.product.js-product .product-info__sticky .product-info__block form [name="id"]').val();
  let ActiveInputVal = $(`.SwymGrPositionSticky .opt-label[data-var-id="${ActiveVariantId}"]`).siblings('.opt-btn[checked]').attr('data-value');
  $(`.product-info__block .SwymGrTemplateOptionsList [id*="${ActiveInputVal}"]`).show();

  if(ActiveInputVal){
    if(ActiveInputVal.includes('sand')){
      $('.SwymGrPositionSticky .product-info .SwymGrTextFields #CustomImagePosition li').each(function(){
        let Elem = $(this);
        let DataVal = Elem.attr('data-value');
        if(!DataVal.includes('sand')){
          Elem.hide();
        }
      })
    }
    else{
     $('.SwymGrPositionSticky .product-info .SwymGrTextFields #CustomImagePosition li').each(function(){
        let Elem = $(this);
        let DataVal = Elem.attr('data-value');
        if(DataVal.includes('sand')){
          Elem.hide();
        }
      })
    }
  }
  
  $(document).on('click', '#fontSelect li', function() {
    let dataValue = $(this).attr('data-value');
    $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').removeClass(function(index, className) {
      return (className.match(/(^|\s)font-\S+/g) || []).join(' ');
    });
    $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').addClass(dataValue);
  })
  
  $(document).on('click', '#fontSizeSelect li', function() {
    let dataValue = $(this).attr('data-value');
    $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').removeClass(function(index, className) {
      return (className.match(/(^|\s)size-\S+/g) || []).join(' ');
    });
    $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').addClass(dataValue);
  })
  
  $(document).on('click', '#fontColorSelect li', function() {
    let dataValue = $(this).attr('data-value');
    $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').removeClass(function(index, className) {
      return (className.match(/(^|\s)color-\S+/g) || []).join(' ');
    });
    $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').addClass(dataValue);
  })
  
  function ActiveSelectedTemplate () {
      ActiveVariantId = $('.SwymGrPositionSticky.product.js-product .product-info__sticky .product-info__block form [name="id"]').val();
      let ActiveTemplateDataValue = $(`.SwymGrPositionSticky .opt-label[data-var-id="${ActiveVariantId}"]`).prev().attr('data-value');
      let ActiveTemplateBlockValue = $(`.product-info__block .SwymGrTemplateOptionsList [id*="${ActiveTemplateDataValue}"]`)
      $(ActiveTemplateBlockValue).find('[type="radio"]').first().next().trigger('click');
      $(ActiveTemplateBlockValue).find('[type="radio"]').first().prop('checked', true);
  }
  
  // -------------- ChangeMediaSrc function -------------- 
  function ChangeMediaSrc(ImageSrc){
      $('.SwymGrPositionSticky .media-gallery__thumbs .media-thumbs__item img[alt="Sample-Image"]').trigger('click');
      let MediaViewerItem = $('.SwymGrPositionSticky div#product-media .media-viewer__item img[alt="Sample-Image"]');
      // ----- media-thumb-item ----
      $('.SwymGrPositionSticky .media-gallery__thumbs .media-thumbs__item img[alt="Sample-Image"]').attr('src',ImageSrc);
      $('.SwymGrPositionSticky .media-gallery__thumbs .media-thumbs__item img[alt="Sample-Image"]').removeAttr('srcset');
      // ---- media-viewer-item ----
      MediaViewerItem.attr('src',ImageSrc);
      MediaViewerItem.siblings('source').attr('srcset',ImageSrc);
      MediaViewerItem.removeAttr('srcset');
  }

  // -------------- DisplayInputField function -------------
  function DisplayInputField(ImageAlt){
        $('.SwymGrPositionSticky .SingleInputField').hide();
        $('.SwymGrPositionSticky .SingleInputField').each(function(){
            let EligibilityText = $(this).attr('data-eligibility');
            if(EligibilityText && EligibilityText.includes('_')){
                EligibilityTextArr = EligibilityText.split('_')
                EligibilityTextArr.forEach((el)=>{
                   if(ImageAlt == el){
                      $(this).show();
                   }
                })
            }
            else{
               if(ImageAlt == EligibilityText){
                  $(this).show();
               }
            }
        })
  }
  
  // -------------- SelectedTemplate name function -------------
  function getSelectedTemplateName (SelectedTemplate) {
    switch(SelectedTemplate){
      case 'OneLineText':
        return 'One line text';
      case 'TwoLineText':
        return 'Two line text';
      case 'TwoLineTextWithImage':
        return 'Two line text with Image';
      case 'ThreeLineText':
        return 'Three Line Text';
      case 'ThreeLineTextWithImage':
        return 'Three line text with Image';
      case 'ThreeLineTextWithImageAndAdditionalText':
        return 'Three line text with Image and Additional Text';
    }
  }
  
  // ---------------- Template Styles click ----------------
  $(document).on('change','.product-info__block .SwymGrTemplateOptionsList .opt-btn',function(){
      let SelectedTemplate = $('.product-info__block .SwymGrTemplateOptionsList fieldset.option-selector [type="radio"]:checked').val();
      // console.log('SelectedTemplate========',SelectedTemplate)
      let SelectedTemplateName = getSelectedTemplateName(SelectedTemplate)
      $('.product-info__block .SwymGrTemplateOptionsList legend.label .option-selector__label-value').text(SelectedTemplateName);
    
      // ----------- rectangle Border list code --------------
      if($(this).next().find('img').attr('src').includes('rectangle_top')){
         $('.SwymGrPositionSticky .product-info #CustomSelectBorder .SwymGrOptionsList > li').each(function(){
            if($(this).find('img').attr('src').includes('SRTBT')) {
              let imgSrc = $(this).find('img').attr('src').split('?v')[0];
              let BorderSelectedName = $(this).find('img').attr('alt').split('--')[1].split('_').join(' ');
              $('.SwymGrPositionSticky .product-info .SwymGrTextFields #CustomSelectBorder .selected-option-name').text(BorderSelectedName).attr('data-img-src',imgSrc); 
              $('.SwymGrPositionSticky div#product-media .LiveWrittenText').removeClass('SR_Side').removeClass('SR_Front').addClass('SR_Top');
            }
         })
      }
      else if($(this).next().find('img').attr('src').includes('rectangle_side')){
         $('.SwymGrPositionSticky .product-info #CustomSelectBorder .SwymGrOptionsList > li').each(function(){
            if($(this).find('img').attr('src').includes('SRSBT')) {
              let imgSrc = $(this).find('img').attr('src').split('?v')[0];
              let BorderSelectedName = $(this).find('img').attr('alt').split('--')[1].split('_').join(' ');
              $('.SwymGrPositionSticky .product-info .SwymGrTextFields #CustomSelectBorder .selected-option-name').text(BorderSelectedName).attr('data-img-src',imgSrc); 
              $('.SwymGrPositionSticky div#product-media .LiveWrittenText').removeClass('SR_Top').removeClass('SR_Front').addClass('SR_Side');
            }
         })
      }
      else if($(this).next().find('img').attr('src').includes('rectangle_front')){
         $('.SwymGrPositionSticky .product-info #CustomSelectBorder .SwymGrOptionsList > li').each(function(){
            if($(this).find('img').attr('src').includes('SRFBT')) {
              let imgSrc = $(this).find('img').attr('src').split('?v')[0];
              let BorderSelectedName = $(this).find('img').attr('alt').split('--')[1].split('_').join(' ');
              $('.SwymGrPositionSticky .product-info .SwymGrTextFields #CustomSelectBorder .selected-option-name').text(BorderSelectedName).attr('data-img-src',imgSrc); 
              $('.SwymGrPositionSticky div#product-media .LiveWrittenText').removeClass('SR_Top').removeClass('SR_Side').addClass('SR_Front');
            }
         })
      }
      
      let ImageSrc = $('.SwymGrPositionSticky .product-info .SwymGrTextFields #CustomSelectBorder .selected-option-name').attr('data-img-src'); 
      let ImageAlt = $(this).next().find('img').attr('alt');
      ChangeMediaSrc(ImageSrc);
      DisplayInputField(ImageAlt);
      $('.product-info .SwymGrTextFields').css('display','flex');
      $('.product-info .SwymGrSelectTopWrapper').show();
      $('.SwymGrPositionSticky .product-info .Additional-fields-Top-wrapper').html('');
  })

  
  // ---------------- Selected Border ----------------
  let InitialBorderSrc = $('.SwymGrPositionSticky #CustomSelectBorder li:first-child img').attr('src').split('?v')[0];
  $('.SwymGrPositionSticky .product-info .SwymGrTextFields #CustomSelectBorder .selected-option-name').attr('data-img-src',InitialBorderSrc);
  $(document).on('click','#CustomSelectBorder li',function(){
    let SelectedBorderSrc = $(this).find('img').attr('src').split('?v')[0];
    let SelectedBorderType = $(this).find('img').attr('alt').split('--')[0];
    let SelectedBorderName = $(this).find('img').attr('alt').split('--')[1].split('_').join(' ');
    $(this).parents('#CustomSelectBorder').find('.selected-option-name').text(SelectedBorderName).attr('data-img-src',SelectedBorderSrc);
    ChangeMediaSrc(SelectedBorderSrc);

   // --------------- set Image Classes on liveWritten part ------------
      let MediaViewerItem = $('.SwymGrPositionSticky div#product-media .media-viewer__item img[alt="Sample-Image"]');
      let ImageNameClass = $(this).find('img').attr('src').split('?v')[0];
      let ImageAlt = $(this).find('img').attr('alt');
      // console.log('ImageNameClass====',ImageNameClass)

      if(ImageAlt){
       // -------------- Grave Markers -------------
       if(ImageNameClass.includes('GMBT')){
          const liveWrittenText = MediaViewerItem.parents('.media-viewer__item').find('.LiveWrittenText');
          const currentClasses = liveWrittenText.attr('class').split(' ').filter(cls => cls !== 'LiveWrittenText');
          liveWrittenText.removeClass(currentClasses.join(' '));
          
          if(ImageAlt.includes('CenterAlignContentWithRightClipArt')){
             liveWrittenText.addClass("CenterAlignContentWithRightClipArt");
          }
          else if(ImageAlt.includes('CenterAlignContent')){
             liveWrittenText.addClass("CenterAlignContent");
          }
          else if(ImageAlt.includes('RightAlignContent')){
             liveWrittenText.addClass("RightAlignContent");
          }
       }
        
       // -------------- SandRectangle -------------
        if(ImageNameClass.includes('SRFBT') || ImageNameClass.includes('SRSBT')){
          
          const liveWrittenText = MediaViewerItem.parents('.media-viewer__item').find('.LiveWrittenText');
          const currentClasses = liveWrittenText.attr('class').split(' ').filter(cls => cls !== 'LiveWrittenText');
          liveWrittenText.removeClass(currentClasses.join(' '));
          
          liveWrittenText.addClass("SandRectangle");
          liveWrittenText.addClass("CenterAlignContent");
          if(ImageNameClass.includes('SRFBT')){
            liveWrittenText.addClass("SR_Front");
          }
          else if(ImageNameClass.includes('SRSBT')){
            liveWrittenText.addClass("SR_Side");
          }
          
        }
      
       // -------------- Sand, Onyx, and Carrera Vases -------------
        if(ImageNameClass.includes('SOVCBT')){
          const liveWrittenText = MediaViewerItem.parents('.media-viewer__item').find('.LiveWrittenText');
          const currentClasses = liveWrittenText.attr('class').split(' ').filter(cls => cls !== 'LiveWrittenText');
          liveWrittenText.removeClass(currentClasses.join(' '));
          liveWrittenText.addClass("SandOnyxCarrera");
          liveWrittenText.addClass("CenterAlignContent");
        }
      }
    // ------ end
  })
  
  $(document).on('input','.product-info .SwymGrTextFields .opt-btn',function(){
    let InputElement = $(this);
    let InputVal = InputElement.val();
    $('.SwymGrPositionSticky .media-gallery__thumbs .media-thumbs__item img[alt="Sample-Image"]').trigger('click');
    let TemplateCheckedValue = $('.SwymGrTemplateOptionsList .SwymGrTemplateOption .opt-btn[type="radio"]:checked');
    if(TemplateCheckedValue.length == 0){
      $('.SwymGrTemplateOptionsList .SwymGrTemplateOption .opt-btn[type="radio"]:first-child').next('.opt-label--swatch').trigger('click');
    }
    
    if($(this).attr('id') == 'TextFieldName'){
     $(`.SwymGrPositionSticky div#product-media .media-viewer__item`).find('.LiveWrittenText .writtenName').text(InputVal);
    }
    if($(this).attr('id') == 'TextFieldDate'){
       $(`.SwymGrPositionSticky div#product-media .media-viewer__item`).find('.LiveWrittenText .writtenDate').text(InputVal);
    }
    if($(this).attr('id') == 'TextFieldSentiment2'){
      if(InputVal.length == 0 ){
        let Sentiment = $('.SwymGrPositionSticky #SelectFieldSentiment > span').text().trim();
        if(!Sentiment.includes('Choose')){
          $('.SwymGrPositionSticky div#product-media .media-viewer__item').find('.LiveWrittenText .writtenSentiment').text(Sentiment);
          $('.SwymGrPositionSticky [name="properties[Sentiment]"]').val(Sentiment);
        }else{
          $('.SwymGrPositionSticky div#product-media .media-viewer__item').find('.LiveWrittenText .writtenSentiment').text('');
          $('.SwymGrPositionSticky [name="properties[Sentiment]"]').val('');
        }
      }else{
        $('.SwymGrPositionSticky div#product-media .media-viewer__item').find('.LiveWrittenText .writtenSentiment').text(InputVal);
        $('.SwymGrPositionSticky [name="properties[Sentiment]"]').val(InputVal);
      }
    } 
    ActiveVariantId = $('.SwymGrPositionSticky.product.js-product .product-info__sticky .product-info__block form [name="id"]').val();
    let ActiveTemplateDataValue = $(`.SwymGrPositionSticky .opt-label[data-var-id="${ActiveVariantId}"]`).prev().attr('data-value');
    let ActiveTemplateBlockValue = $(`.product-info__block .SwymGrTemplateOptionsList [id*="${ActiveTemplateDataValue}"]`)
    if($(ActiveTemplateBlockValue).find('[type="radio"]:checked').length == 0){
      $(ActiveTemplateBlockValue).find('[type="radio"]').first().prop('checked', true);
      $(ActiveTemplateBlockValue).find('[type="radio"]').first().next().trigger('click');
      InputElement.focus();
    }
  });
  
  $(document).on('click','.SwymGrPositionSticky #SelectFieldSentiment li',function(){
    ActiveSelectedTemplate();
    $('.SwymGrPositionSticky .media-gallery__thumbs .media-thumbs__item img[alt="Sample-Image"]').trigger('click');
    let TemplateCheckedValue = $('.SwymGrTemplateOptionsList .SwymGrTemplateOption .opt-btn[type="radio"]:checked');
    if(TemplateCheckedValue.length == 0){
      $('.SwymGrTemplateOptionsList .SwymGrTemplateOption .opt-btn[type="radio"]:first-child').next('.opt-label--swatch').trigger('click');
    }
    
    let SelectedSentiment = $(this).text();
    if($(this).parents('.SwymGrTextField').siblings('.SwymGrTextField').find('#TextFieldSentiment2').val() == ''){
      $('.SwymGrPositionSticky div#product-media .media-viewer__item').find('.LiveWrittenText .writtenSentiment').text(SelectedSentiment);
      $('.SwymGrPositionSticky [name="properties[Sentiment]"]').val(SelectedSentiment);
    }
  });
  
  $(document).on('change','.SwymGrPositionSticky #UploadCustomImage',function(event){
    let FileInputElem = $(this);
    if($('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner .ClipArtImg').length){
      $('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner .ClipArtImg').remove();
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e){
        let ClipArtImg;
        if($('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SOVCBT') || 
           $('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SRSBT') ||
           $('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SRFBT') ){
          ClipArtImg = `<div class="ClipArtImg imageposition-above-sand-text"><img src="${e.target.result}"></div>`;
          $('.SwymGrPositionSticky div#product-media .LiveWrittenText .LiveWrittenText-Inner').removeClass('Content-Top-position');
          $('.SwymGrPositionSticky div#product-media .LiveWrittenText .LiveWrittenText-Inner').addClass('Content-Bottom-position');
        }
        else{
         ClipArtImg = `<div class="ClipArtImg imageposition-bottom-center"><img src="${e.target.result}"></div>`;
        }
        $('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner').append(ClipArtImg)
      }
    }
  });
  
  $(document).on('click','.SwymGrPositionSticky #CustomClipArtSelect li',function(event){
    $('.SwymGrPositionSticky .media-gallery__thumbs .media-thumbs__item img[alt="Sample-Image"]').trigger('click');
    let TemplateCheckedValue = $('.SwymGrTemplateOptionsList .SwymGrTemplateOption .opt-btn[type="radio"]:checked');
    if(TemplateCheckedValue.length == 0){
      $('.SwymGrTemplateOptionsList .SwymGrTemplateOption .opt-btn[type="radio"]:first-child').next('.opt-label--swatch').trigger('click');
    }
    
    if($('.SwymGrPositionSticky #UploadCustomClipart').val() == ""){
      ActiveSelectedTemplate();
      if($('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner .ClipArtImg').length){
        $('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner .ClipArtImg').remove();
      }
      let SelectedClipArtImgSrc = $(this).find('img').attr('src');
      let ClipArtImg;
     
      if($('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SOVCBT') || 
         $('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SRSBT') ||
         $('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SRFBT') ){
        ClipArtImg = `<div class="ClipArtImg imageposition-above-sand-text"><img src="${SelectedClipArtImgSrc}"></div>`;
        $('.SwymGrPositionSticky div#product-media .LiveWrittenText .LiveWrittenText-Inner').removeClass('Content-Top-position');
        $('.SwymGrPositionSticky div#product-media .LiveWrittenText .LiveWrittenText-Inner').addClass('Content-Bottom-position');
      }
      else{
        ClipArtImg = `<div class="ClipArtImg imageposition-bottom-center"><img src="${SelectedClipArtImgSrc}"></div>`;
      }
      $('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner').append(ClipArtImg);
    }
  });

  $(document).on('click','.SwymGrPositionSticky #CustomImageSelect li',function(event){
    $('.SwymGrPositionSticky .media-gallery__thumbs .media-thumbs__item img[alt="Sample-Image"]').trigger('click');
    let TemplateCheckedValue = $('.SwymGrTemplateOptionsList .SwymGrTemplateOption .opt-btn[type="radio"]:checked');
    if(TemplateCheckedValue.length == 0){
      $('.SwymGrTemplateOptionsList .SwymGrTemplateOption .opt-btn[type="radio"]:first-child').next('.opt-label--swatch').trigger('click');
    }
    
    if($('.SwymGrPositionSticky #UploadCustomImage').val() == ""){
      ActiveSelectedTemplate();
      if($('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner .ClipArtImg').length){
        $('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner .ClipArtImg').remove();
      }
      let SelectedClipArtImgSrc = $(this).find('img').attr('src');
      let ClipArtImg;
      
      if($('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SOVCBT') || 
         $('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SRSBT') ||
         $('.product-info .SwymGrTemplateOptionsList #SwymGrOption-default-title .opt-btn[type="radio"]:checked').next('.opt-label--swatch').find('img').attr('src').includes('SRFBT') ){
        ClipArtImg = `<div class="ClipArtImg imageposition-above-sand-text"><img src="${SelectedClipArtImgSrc}"></div>`;
        $('.SwymGrPositionSticky div#product-media .LiveWrittenText .LiveWrittenText-Inner').removeClass('Content-Top-position');
        $('.SwymGrPositionSticky div#product-media .LiveWrittenText .LiveWrittenText-Inner').addClass('Content-Bottom-position');
      }else{
        ClipArtImg = `<div class="ClipArtImg imageposition-bottom-center"><img src="${SelectedClipArtImgSrc}"></div>`;
      }
      $('.SwymGrPositionSticky div#product-media .LiveWrittenText-Inner').append(ClipArtImg);
    }
  });
  
  $(document).on('click','.SwymGrPositionSticky .SwymGrTextFields #CustomImagePosition li',function(){
    $('.SwymGrPositionSticky .SwymGrTextFields  #CustomImagePositionValue').val($(this).attr('data-value'));
    let ImagePosition = $('.SwymGrPositionSticky .SwymGrTextFields  #CustomImagePositionValue').val();
    $('.SwymGrPositionSticky #product-media .LiveWrittenText .ClipArtImg').removeClass(function(index, className) {
      return (className.match(/(^|\s)imageposition\S+/g) || []).join(' ');
    });
    ImagePosition = 'imageposition-'+ImagePosition
    $('.SwymGrPositionSticky #product-media .LiveWrittenText .ClipArtImg').addClass(ImagePosition);
    if(ImagePosition.includes('middle-center')){
      $('.SwymGrPositionSticky #product-media .LiveWrittenText .ClipArtImg').parents('.LiveWrittenText-Inner').addClass('MiddleCenterWrapper');
    }else{
      $('.SwymGrPositionSticky #product-media .LiveWrittenText .ClipArtImg').parents('.LiveWrittenText-Inner').removeClass('MiddleCenterWrapper');
    }
    
    if(ImagePosition.includes('below-sand')){
      $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').removeClass('Content-Bottom-position')
      $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').addClass('Content-Top-position')
    }
    else if(ImagePosition.includes('above-sand')){
      $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').removeClass('Content-Top-position')
      $('.SwymGrPositionSticky #product-media .LiveWrittenText .LiveWrittenText-Inner').addClass('Content-Bottom-position')
    }
    
  })

// ===================== Additional Line/Cipart ========================
  // ------  Additional Line
  function setAdditionalTextCount () {
    $('.SwymGrPositionSticky .AdditionalLineWrapper .Additional-fields-Top-wrapper .Additional-fields-wrapper').each(function(index){
      $(this).find('textarea').attr('name',`properties[Additional Text ${index+1}]`);
    })
  }
  $(document).on('click','.SwymGrPositionSticky .product-info .AdditionalLine',function(){
    let AdditionalField = $('.SwymGrPositionSticky .product-info .AdditionalLineWrapper .Additional-fields-sample').html();
    $('.SwymGrPositionSticky .product-info .AdditionalLineWrapper .Additional-fields-Top-wrapper').append(AdditionalField);
    $('.SwymGrPositionSticky .product-info .AdditionalLineWrapper .Additional-fields-Top-wrapper .Additional-fields-wrapper').addClass('additional-product');
    setAdditionalTextCount();
    $('.SwymGrPositionSticky .AdditionalLineWrapper').show();
  })
  $(document).on('click','.product-info .SwymGrTextFields .AdditionalLineWrapper .Additional-fields-wrapper .RemoveAddtionalLine',function(){
    if($('.product-info .SwymGrTextFields .AdditionalLineWrapper .Additional-fields-wrapper').length == 2){
      $(this).parents('.SwymGrTextField').hide();
    }
    $(this).parents('.Additional-fields-wrapper').remove();
      setAdditionalTextCount();
  })

  // ------  Additional Cipart
  function generateRandomID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  function setAdditionalClipartCount (ClickedElement) {
    $('.SwymGrPositionSticky .AdditionalClipartWrapper .Additional-fields-Top-wrapper .Additional-fields-wrapper').each(function(index){
      $(this).find('input').attr('name',`properties[Custom Clipart ${index+1}]`);
      if(ClickedElement && ClickedElement.hasClass('AdditionalClipart')){
        let randomClipartID = generateRandomID(6);
        $(this).find('input').attr('id',`UploadCustomClipart-${randomClipartID}`);
        $(this).find('label').attr('for',`UploadCustomClipart-${randomClipartID}`);
      }
    })
  }
  $(document).on('click','.SwymGrPositionSticky .product-info .AdditionalClipart',function(){
    let AdditionalField = $('.SwymGrPositionSticky .product-info .AdditionalClipartWrapper .Additional-fields-sample').html();
    $('.SwymGrPositionSticky .product-info .AdditionalClipartWrapper .Additional-fields-Top-wrapper').append(AdditionalField);
    let ClickedElement = $(this);
    setAdditionalClipartCount(ClickedElement);
    $('.SwymGrPositionSticky .product-info .AdditionalClipartWrapper .Additional-fields-Top-wrapper .Additional-fields-wrapper').addClass('additional-product');
    $('.SwymGrPositionSticky .AdditionalClipartWrapper').show();
  });
  $(document).on('click','.product-info .SwymGrTextFields .AdditionalClipartWrapper .Additional-fields-wrapper .RemoveAddtionalLine',function(){
    if($('.product-info .SwymGrTextFields .AdditionalClipartWrapper .Additional-fields-wrapper').length == 2){
      $(this).parents('.SwymGrTextField').hide();
    }
    $(this).parents('.Additional-fields-wrapper').remove();
    let ClickedElement = $(this);
    setAdditionalClipartCount(null)
  });

// ===================== Select Rectangle Surface ==================
  $(document).on('change','.SwymGrPositionSticky #RectangleSurfaceWrapper .rectangle-surface-input [type="radio"]',function(){
    let RectangleSurfaceValue = $('.SwymGrPositionSticky #RectangleSurfaceWrapper .rectangle-surface-input [type="radio"]:checked').val();
    let RectangleSurface = RectangleSurfaceValue.replace(/-/g, ' ');
    $('.SwymGrPositionSticky #RectangleSurfaceWrapper .Selected-rectangle-surface').text(RectangleSurface);
    $('.SwymGrPositionSticky .SwymGrTemplateOptionsList fieldset.option-selector').show();
    $('.SwymGrPositionSticky .SwymGrTemplateOption label.opt-label--swatch').hide();
    $('.SwymGrPositionSticky .product-info #CustomSelectBorder .SwymGrOptionsList > li').hide();
    let isClicked = true;
    $('.SwymGrPositionSticky .SwymGrTemplateOption label.opt-label--swatch').each(function(){
          if(RectangleSurfaceValue == 'rectangle-top-face'){
              if($(this).find('img').attr('src').includes('rectangle_top')){
                 $(this).show();
                 if(isClicked) {
                   $(this).click();
                   isClicked = false;
                 }
              }
              $('.SwymGrPositionSticky .product-info #CustomSelectBorder .SwymGrOptionsList > li').each(function(){
                  if($(this).find('img').attr('src').includes('SRTBT')) {
                    $(this).show();
                  }
              })
          }
          else if(RectangleSurfaceValue == 'rectangle-side-face') {
              if($(this).find('img').attr('src').includes('rectangle_side')){
                 $(this).show();
                 if(isClicked) {
                   $(this).click();
                   isClicked = false;
                 }
              }
              $('.SwymGrPositionSticky .product-info #CustomSelectBorder .SwymGrOptionsList > li').each(function(){
                  if($(this).find('img').attr('src').includes('SRSBT')){
                    $(this).show(); 
                  }
              })
          }
          else if(RectangleSurfaceValue == 'rectangle-front-face') {
              if($(this).find('img').attr('src').includes('rectangle_front')){
                 $(this).show();
                 if(isClicked) {
                   $(this).click();
                   isClicked = false;
                 }
              }
              $('.SwymGrPositionSticky .product-info #CustomSelectBorder .SwymGrOptionsList > li').each(function(){
                  if($(this).find('img').attr('src').includes('SRFBT')){
                    $(this).show(); 
                  }
              })
          }
    })
  })
  
// ===================== Capture Preview ========================

  $(document).on('click','.SwymGrPositionSticky .product-info__add-to-cart #UploadPreviewImage',function(){
        const $uploadBtn = $(this);
        if ($uploadBtn.attr('aria-disabled') === 'true') {
          return; 
        }
        $uploadBtn.attr('aria-disabled', 'true').addClass('upload-loading');
        var element = $('#product-media .media-gallery__viewer')[0];
        var width = $(element).outerWidth();
        var height = $(element).outerHeight();
    
        html2canvas($('#product-media .media-gallery__viewer')[0],{
            useCORS: true ,
            width: width, // Set your desired width
            height: height 
        }).then(function(canvas) {
            var base64Image = canvas.toDataURL("image/jpg");
            uploadImage(base64Image);
        });
    
       function uploadImage(base64Image) {
          fetch('https://dev.shopifyexperthelp.com/app/devb/rsdesign/index_rsdesign.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ image: base64Image })
          })
          .then(response => response.json())
          .then(data => {
              if (data.status === 'success') {
                  const imageUrl = data.path; // Extract the image URL
                  document.querySelector('.SwymGrPositionSticky #PreviewImage[name="properties[Preview Image]"]').value = imageUrl;
                  let inputImgVal = document.querySelector('.SwymGrPositionSticky #PreviewImage[name="properties[Preview Image]"]').value;
                  $('.SwymGrPositionSticky .product-info__add-to-cart [type="submit"]').click();
              }else { }
          }).catch(error => {
          }).finally(() => {
              setTimeout(() => {
                  $uploadBtn.attr('aria-disabled', 'false').removeClass('upload-loading');
              }, 1400); 
          });
       }
  });
});

$(window).on('load', function() {
    let MediaViewerItem = $('.SwymGrPositionSticky div#product-media .media-viewer__item img[alt="Sample-Image"]');
    MediaViewerItem.parents('.media-viewer__item').find('.LiveWrittenText').addClass("CenterAlignContent");
    if($("body").hasClass('templateNamecustom-onyx')){
        MediaViewerItem.parents('.media-viewer__item').find('.LiveWrittenText').addClass("SandOnyxCarrera");
    }
    else if($("body").hasClass('templateNamecustom-rectangle')){
        MediaViewerItem.parents('.media-viewer__item').find('.LiveWrittenText').addClass("SandRectangle");
        MediaViewerItem.parents('.media-viewer__item').find('.LiveWrittenText').addClass("SR_Side");
    }
});