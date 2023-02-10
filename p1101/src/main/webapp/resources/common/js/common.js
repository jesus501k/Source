

	// 패턴
	var PATTERN_ID = /^[A-Za-z]{1}[A-Za-z0-9]{6,20}$/;
	var PATTERN_PW = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
	//var PATTERN_DATE = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
	var PATTERN_DATE = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
	var PATTERN_NM = /^[가-힣]{2,4}$/;
	var PATTERN_NCK = /[0-9]|[a-z]|[A-Z]|[가-힣]/;
	//var PATTERN_PHONE = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	var PATTERN_PHONE = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
	var PATTERN_EMAIL = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	// URI
	var URI_INDEX = '/good/goodCategoryView.do?p1=BEST&p2=ALL';
	var URI_LOGIN = '/user/userLoginView.do';

	// 세션
	var LOGIN_STATE = '';
	var USER_LEV = '';

	/** @content AJAX 설정 */
	$.ajaxSetup({
		method: 'post',
		headers : {
			'Content-Type': 'application/json'
		},
		datatype: 'json',
		async: true,
		beforeSend: function(xhr) {
			$('#loaderMask').fadeTo('slow', 1);
			$('#loader').fadeTo('slow', 0.5);

			$('body').on('scroll touchmove mousewheel', function(event) {
				event.preventDefault();
				event.stopPropagation();
				return false;
			});

			xhr.setRequestHeader('AJAX', true);
	    },
		error: function(request, status, textStatus, error) {
			var errorCode = request.status;

			if(errorCode == '400') {
				var html = '';
				var form = $('<form></form>');
				form.attr('action', '/error.do');
				form.attr('method', 'post');
				form.appendTo('body');
				form.html(html);
				form.submit();
				form.remove();
			}

			// SC_FORBIDDEN
			if(errorCode == '403') {
				alert('세션이 만료되었습니다.');
				location.href = URI_INDEX;
			}

			// SC_TEMPORARY_REDIRECT
			if(errorCode == '307') {
				if(confirm('로그인 후 이용 가능합니다. 이동하시겠습니까?')) {
					location.href = URI_LOGIN;
				}
			}
		},
		complete: function (request) {
			$('#loader').hide();
			$('#loaderMask').hide();
			$('body').off('scroll touchmove mousewheel');
		}
	});

	/** @content 공통 함수 */
	function cmn(json) {
		LOGIN_STATE = json.loginState; // 로그인 상태
		USER_LEV = json.userLev; // 유저 레벨

		// 상품 카테고리
		var bestGoodCategoryList = json.bestGoodCategoryList; // 인기 상품 카테고리 리스트
		var topGoodCategoryList = json.topGoodCategoryList; // 상의 상품 카테고리 리스트
		var bottomGoodCategoryList = json.bottomGoodCategoryList; // 하의 상품 카테고리 리스트
		var outerGoodCategoryList = json.outerGoodCategoryList; // 아우터 상품 카테고리 리스트
		var shoesGoodCategoryList = json.shoesGoodCategoryList; // 신발 상품 카테고리 리스트
		var otherGoodCategoryList = json.otherGoodCategoryList; // 그외 상품 카테고리 리스트

		// 유저 카트 개수
		var userCartCnt = json.userCartCnt;

		// 모바일 유저 카트 개수
		$('#mblUserCartCnt').html(userCartCnt);

		// 공통 프린트 탑 바 링크
		cmnPrintTopBarLinkList();

		// 공통 프린트 상품 카테고리 리스트
		cmnPrintGoodCategoryList(bestGoodCategoryList, '#bestGoodCategoryList');
		cmnPrintGoodCategoryList(topGoodCategoryList, '#topGoodCategoryList');
		cmnPrintGoodCategoryList(bottomGoodCategoryList, '#bottomGoodCategoryList');
		cmnPrintGoodCategoryList(outerGoodCategoryList, '#outerGoodCategoryList');
		cmnPrintGoodCategoryList(shoesGoodCategoryList, '#shoesGoodCategoryList');
		cmnPrintGoodCategoryList(otherGoodCategoryList, '#otherGoodCategoryList');

		// 로그인 상태 Y/N SHOW
		if(LOGIN_STATE == 'Y') $('.dspLogin').show();
		if(LOGIN_STATE == 'N') $('.dspNonLogin').show();
	}

	/** @content 3자리 콤마 포맷 */
	function cmn_comma3Format(var1) {
		var target = var1;
		return String(target).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	}

	/** @content 콤마 제거 */
	function cmn_commaRemove(var1) {
		var target = var1;
		return String(target).replace(/,/g, '');
	}

	/** @content 공통 프린트 탑 바 링크 리스트 */
	function cmnPrintTopBarLinkList() {
		if(USER_LEV == 'master') {
			$('#cmnTopBarLinkList, #cmnMblTopBarLinkList').html(''
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userLogout.do\')">LOGOUT</a></li>'
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'post\', \'/admin/adminMypageView.do\')">MY PAGE</a></li>'
			);

			return;
		}

		if(LOGIN_STATE == 'N') {
			$('#cmnTopBarLinkList, #cmnMblTopBarLinkList').html(''
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userLoginView.do\')">LOGIN</a></li>'
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userRegisterView.do\')">JOIN</a></li>'
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userFindView.do\')">FIND ME</a></li>'
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userCartView.do\')">MY CART</a></li>'
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userOrderView.do\')">MY ORDER</a></li>'
			);
		}

		if(LOGIN_STATE == 'Y') {
			$('#cmnTopBarLinkList, #cmnMblTopBarLinkList').html(''
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userLogout.do\')">LOGOUT</a></li>'
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userCartView.do\')">MY CART</a></li>'
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'get\', \'/user/userOrderView.do\')">MY ORDER</a></li>'
				+ '<li class="top-bar-link li"><a onclick="cmnTopBarLinkClick(\'post\', \'/user/userMypageView.do\')">MY PAGE</a></li>'
			);
		}
	}

	/** @content 공통 프린트 상품 카테고리 리스트 */
	function cmnPrintGoodCategoryList(var1, var2) {
		var goodCategoryList = var1;
		var target = var2;

		$(target).html('');
		$(goodCategoryList).each(function (i, obj) {
			if(i == 0) {
				$(target).append('<a href="#" onclick="cmnGoodCategoryClick(\'' + obj.GOOD_CATEGORY1_CD + '\', \'' + obj.GOOD_CATEGORY2_CD + '\')">' + obj.GOOD_CATEGORY1_NM + '</a>');
				$(target).append('<i class="fa fa-angle-down dropdown-toggle" data-toggle="dropdown"></i>');
				$(target).append('<ul class="dropdown-menu"></ul>');
			}
			$(target).find('ul').eq(0).append('<li><a href="#" onclick="cmnGoodCategoryClick(\'' + obj.GOOD_CATEGORY1_CD + '\', \'' + obj.GOOD_CATEGORY2_CD + '\')">' + obj.GOOD_CATEGORY2_NM + '</a></li>');
		});
	}

	/** @content 공통 상품 카테고리 (클릭) */
	function cmnGoodCategoryClick(var1, var2) {
		location.href = '/good/goodCategoryView.do?p1=' + var1 + '&p2=' + var2 + '';
	}

	/** @content 공통 유저 카테고리 (클릭) */
	function cmn_userCategoryClick(var1, var2) {
		var method = var1
		var action = var2;

		// get
		if(method == 'get') {
			location.href = action;
		}

		// post
		if(method == 'post') {
			var html = '';
			var form = $('<form></form>');
			form.attr('action', action);
			form.attr('method', 'post');
			form.appendTo('body');
			form.html(html);
			form.submit();
			form.remove();
		}
	}

	/** @content 공통 관리자 카테고리 (클릭) */
	function cmnAdminCategoryClick(var1, var2) {
		var method = var1
		var action = var2;

		// get
		if(method == 'get') {
			location.href = action;
		}

		// post
		if(method == 'post') {
			var html = '';
			var form = $('<form></form>');
			form.attr('action', action);
			form.attr('method', 'post');
			form.appendTo('body');
			form.html(html);
			form.submit();
			form.remove();
		}
	}

	/** @content 관리자 로그아웃 버튼 */
	function adminLogoutBtnClick() {
		location.href = '/admin/adminLogout.do';
	}

	/** @content 사이드바 메뉴 */
	function sidebarMenuClick(tag, var1, var2) {
		var method = var1
		var action = var2;

		// get
		if(method == 'get') {
			location.href = action;
		}

		// post
		if(method == 'post') {
			var html = '';
			var form = $('<form></form>');
			form.attr('action', action);
			form.attr('method', 'post');
			form.appendTo('body');
			form.html(html);
			form.submit();
			form.remove();
		}
	}

	/** @content 페이지네이션 */
	function PAGINATION (var1, var2, var3) {
		var pagination = var1;
		var target = var2;
		var btnName = var3;

		$(target).html('');

		if (pagination.prev == true) {
			$(target).append(''
				+ '<li class="page-item">'
                	+ '<a class="page-link" style="cursor: pointer;" onclick="' + btnName + 'Click(' + ((pagination.startPage*1)-1) + ')">Previous</a>'
                + '</li>'
            );
		} else {
			$(target).append(''
				+ '<li class="page-item disabled">'
					+ '<a class="page-link" style="cursor: pointer;">Previous</a>'
				+ '</li>'
			);
		}

		for (var i = (pagination.startPage*1), len = (pagination.endPage*1); i <= len; i++) {
			if((pagination.page*1) == i) {
				$(target).append('<li class="page-item active"><a class="page-link" style="cursor: default;">' + i + '</a></li>');
			} else {
				$(target).append('<li class="page-item"><a class="page-link" style="cursor: pointer;" onclick="' + btnName + 'Click(' + i + ')">' + i + '</a></li>');
			}
		}

		if (pagination.next == true) {
			$(target).append(''
				+ '<li class="page-item">'
                	+ '<a class="page-link" style="cursor: pointer;" onclick="' + btnName + 'Click(' + ((pagination.endPage*1)+1) + ')">Next</a>'
                + '</li>'
            );
		} else {
			$(target).append(''
				+ '<li class="page-item disabled">'
					+ '<a class="page-link" style="cursor: pointer;">Next</a>'
				+ '</li>'
			);
		}
	}






