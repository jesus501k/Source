<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page trimDirectiveWhitespaces="true"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/WEB-INF/views/include/head.jsp"></jsp:include>
	<link rel="stylesheet" href="/p1101/css/home/homeView.css"/>
</head>

<body>
	<jsp:include page="/WEB-INF/views/include/header.jsp"></jsp:include>

	<div style="padding: 5px 5px">homeView.jsp</div>

	<jsp:include page="/WEB-INF/views/include/footer.jsp"></jsp:include>
</body>

	<jsp:include page="/WEB-INF/views/include/script.jsp"></jsp:include>
	<script type="text/javascript" src="/p1101/js/home/homeView.js" charset="UTF-8"></script>
</html>