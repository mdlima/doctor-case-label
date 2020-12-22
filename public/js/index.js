window.addEventListener('load', () => {
  function changeToLoggedOutState() {
    window.loggedIn = false;

    jQuery('#userName').val('');
    jQuery('#userLoggedOut').removeAttr('hidden');
    jQuery('#userLoggedIn').attr('hidden', '');
    jQuery('#caseLabelLoggedOut').removeAttr('hidden');
    jQuery('#caseLabelLoggedIn').attr('hidden', '');
  }

  function login(event) {
    event.preventDefault();

    const email = jQuery('#loginEmail').val();
    const password = jQuery('#loginEmail').val();

    ApiHelper.login(
      { email, password },
      (userData) => changeToLoggedInState(userData),
    );
  }

  function changeToLoggedInState(userData) {
    window.loggedIn = true;
    window.loggedInUser = userData;

    jQuery('#userName').val(userData.name);
    jQuery('#userLoggedOut').attr('hidden', '');
    jQuery('#userLoggedIn').removeAttr('hidden');
    jQuery('#caseLabelLoggedOut').attr('hidden', '');
    jQuery('#caseLabelLoggedIn').removeAttr('hidden');

    fetchConditions();
    fetchCaseToReview();
  }

  function fetchConditions() {
    if (jQuery('#condition option').length > 0) {
      return;
    }
    // jQuery('#condition').html('');
    ApiHelper.listConditions((conditions) => {
      conditions.forEach((condition) => {
        jQuery('#condition')
          .append(jQuery('<option>', {
            value: condition._id,
            text: `${condition.description} (${condition.code})`,
          }));
      });
    });
  }

  function fetchCaseToReview() {
    ApiHelper.getNextCaseToReview((caseData) => {
      jQuery('#ehr').text(caseData.ehr || '');
      jQuery('#caseId').val(caseData._id || '');
      if (jQuery.isEmptyObject(caseData)) {
        showAlert('You are Done.', 'alert-primary');
      }
    });
  }

  function showAlert(message, alertClass = 'alert-danger') {
    const alertHtml = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    jQuery('#main').prepend(alertHtml);
  }

  function addCaseReview() {
    const caseId = jQuery('#caseId').val();
    const userId = window.loggedInUser._id;
    const conditionId = jQuery('#condition').val();
    ApiHelper.addCaseReview(
      { caseId, userId, conditionId },
      fetchCaseToReview,
      () => {
        showAlert('Error trying to add review, please try again.');
      },
    );
  }

  jQuery('#nextCase').on('click', addCaseReview);
  jQuery('#logout').on('click', changeToLoggedOutState);

  jQuery('#loginForm').on('submit', login);

  changeToLoggedOutState();
});
