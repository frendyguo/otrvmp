const initialFilterState = {
  category: {},
  binding: {},
  stockStatus: {},
  language: {}
}

let filters = {
  category: {},
  binding: {},
  stockStatus: {},
  language: {}
};

function openFilterModal() {
  $('#filterModal').addClass('open');
  $('html, body').css('overflow', 'hidden'); 
}

function closeFilterModal() {
  $('#filterModal').removeClass('open');
  $('html, body').css('overflow', 'initial');
}

function isFilterExist() {
  let filterExist = false;
  for (const [key, value] of Object.entries(filters)) {
    if (typeof value === 'object') {
      const objectKeys = Object.keys(value);
      if (!objectKeys) filterExist = false;
      else {
        objectKeys.forEach(function(item) {
          if (value[item]) filterExist = true;
        });  
      }
    }

    if (typeof value === 'string') {
      filterExist = !!value;
    }
  }

  return filterExist;
}

function updateFilterResetState() {
  if (isFilterExist()) {
    $('.filtermodal__cta-reset').addClass('filtermodal__cta-reset_show');
  } else {
    $('.filtermodal__cta-reset').removeClass('filtermodal__cta-reset_show');
  }
}

function resetFilter() {
  filters = JSON.parse(JSON.stringify(initialFilterState));
  $('#filterModal input[type="checkbox"]').prop('checked', false);
  $('#filterModal input[type="number"]').val('');

  updateFilterResetState();
}

function attachFilterEvents() {
  $('#filterModal input[type="checkbox"]').change(function() {
    const input = $(this);
    const checked = input.prop('checked');
    const name = input.attr('name');
    const value = input.val();
    filters[name][value] = checked;

    updateFilterResetState();
  });

  $('#filterModal input[type="number"]').on('change paste keyup', (function() {
    const input = $(this);
    const name = input.attr('name');
    const value = input.val();
    filters[name] = value;

    updateFilterResetState();
  }));
}

$(document).ready(function() {
  $('.header__search-dropdown-select').select2({
    width: 100,
    dropdownCssClass: 'dropdown__container header__search-dropdown-container',
    selectionCssClass: 'dropdown__selection',
    minimumResultsForSearch: -1
  });

  // Selector for "Sort by", "Not-in stock items", "View per page"
  $('.srp__filter-item-popover').select2({
    width: 'auto',
    dropdownCssClass: 'popover__container',
    selectionCssClass: 'popover__selection',
    minimumResultsForSearch: -1
  });

  // onChange callback for "Sort by", "Not-in stock items", "View per page"
  $('.srp__filter-item-popover').on('select2:select', function(e) {
    console.log(e.params.data);
  })

  $('.srp__filter-button').click(function() {
    openFilterModal();
  });

  $('#filterModalCloseButton').click(function() {
    closeFilterModal();
  });

  // Show reset only when filters are applied
  attachFilterEvents();
  $('.filtermodal__cta-reset').click(function() {
    resetFilter();
  });

  $('.filtermodal__cta-submit').click(function() {
    window.location.href = '../2_1_search_result/index.html';
  });

  $('.filterbox__group-seemore').click(function() {
    const group = $(this).closest('.filterbox__group');
    group.toggleClass('filterbox__group_more');

    const isSeeMore = group.hasClass('filterbox__group_more');
    $(this).text(isSeeMore ? 'See less' : 'See more');
  });

  // Set "checked" state of checkbox to reflect current state
  $('.filterbox__group-item .checkbox').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    const checkbox = $(this).find('.checkbox__input');
    checkbox.attr('checked', !checkbox.attr('checked'));
  });

  // With the above scripts loaded, you can call `tippy()` with a CSS
  // selector and a `content` prop:
  tippy('.product__promo-info', {
    content: 'Price incl. GST. Local courier delivery with tracking number.',
    trigger: 'mouseenter',
    theme: 'custom',
    arrow: false,
    placement: 'bottom-start',
    maxWidth: 440,
    offset: [-60, 8]
  });
});
