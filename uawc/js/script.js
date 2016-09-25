$(document).ready(function() {

	//Step1 carousel
	var i = 1;
	$('.step1 .arr_right').click(function(){
			$(this).parent().children('.substep'+i).fadeOut(300, function() {
				if (i >= 3) {
					i = 0;
				}
				$(this).parent().children('.substep'+(i+1)).fadeIn(300);
				i++;
			});

	});
	i = 1
	$('.step1 .arr_left').click(function(){
			$(this).parent().children('.substep'+i).fadeOut(300, function() {
				if (i <= 1) {
					i = 4;
				}
				$(this).parent().children('.substep'+(i-1)).fadeIn(300);
				i--;
			});
			
			
	});

	//Step2 carousel
	var j = 1;
	$('.step2 .arr_right').click(function(){
			$(this).parent().children('.substep'+j).fadeOut(300, function() {
				if (j >= 3) {
					j = 0;
				}
				$(this).parent().children('.substep'+(j+1)).fadeIn(300);
				j++;
			});
			
			
	});
	j = 1
	$('.step2 .arr_left').click(function(){
			$(this).parent().children('.substep'+j).fadeOut(300, function() {
				if (j <= 1) {
					j = 4;
				}
				$(this).parent().children('.substep'+(j-1)).fadeIn(300);
				j--;
			});
			
			
	});

	//Step3 carousel
	var k = 1;
	$('.step3 .arr_right').click(function(){
			$(this).parent().children('.substep'+k).fadeOut(300, function() {
				if (k >= 3) {
					k = 0;
				}
				$(this).parent().children('.substep'+(k+1)).fadeIn(300);
				k++;
			});
			
			
	});
	k = 1
	$('.step3 .arr_left').click(function(){
			$(this).parent().children('.substep'+k).fadeOut(300, function() {
				if (k <= 1) {
					k = 4;
				}
				$(this).parent().children('.substep'+(k-1)).fadeIn(300);
				k--;
			});
			
			
	});
});
