"use strict";$(document).ready(function(){$("form").on("submit",function(){var form=this;$.post("/contact.php",$(this).serialize()).done(function(){$(".message-success").slideDown();form.reset();$(form).find("input, button").prop("disabled",true)}).fail(function(ret){JSON.parse(ret.responseText).forEach(function(err){$('.form-group[data-form-group="'+err+'"]').addClass("has-error")})});return false});$("form").on("click",".form-group.has-error",function(){$(this).removeClass("has-error")})});