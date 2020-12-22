class ApiHelper {
  static login({ email, password }, success) {
    jQuery.ajax({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: `/users/login`,
      type: 'POST',
      data: JSON.stringify({
        email,
        password,
      }),
      success,
      error(jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log(`The following error occured: ${textStatus}`, errorThrown);
      },
    });
  }

  static listConditions(success) {
    jQuery.ajax({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: `/conditions`,
      type: 'GET',
      success,
      error(jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log(`The following error occured: ${textStatus}`, errorThrown);
      },
    });
  }

  static getNextCaseToReview(success) {
    jQuery.ajax({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: `/cases/nextToReview`,
      type: 'GET',
      success,
      error(jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log(`The following error occured: ${textStatus}`, errorThrown);
      },
    });
  }

  static addCaseReview({ caseId, userId, conditionId }, success, errorCallback) {
    jQuery.ajax({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: `/cases/id/${caseId}`,
      type: 'PATCH',
      data: JSON.stringify({
        review: {
          userId,
          conditionId,
        },
      }),
      success,
      error(jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log(`The following error occured: ${textStatus}`, errorThrown);
        errorCallback(jqXHR, textStatus, errorThrown);
      },
    });
  }
}
