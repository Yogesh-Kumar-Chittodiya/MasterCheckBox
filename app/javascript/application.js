// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
// import * as bootstrap from "bootstrap"
import "./style"
import "./jquery"





var counter = 0;
$(".book-select-check").on("click",function(){
    if($(this).prop("checked")){
        counter+=1;
        // $("#delete-books").css("display","block");
        $("#delete-books").text(`Delete ${pluralize(counter,"Book")}`);
        $("#delete-books").show();
        console.log("checkbox selected : "+counter)
    }
    else{
        counter--;
        console.log("total checkbox selected : "+counter)
        $("#delete-books").text(`Delete ${pluralize(counter,"Book")}`);
        if(counter <= 0){
            // $("#delete-books").css("display","none");
            $("#delete-books").hide();
        }   
    }
});


$("#delete-books").on("click",function(){
    var bookIds=[];

    $(".book-select-check").each(function(){
        if($(this).prop("checked")){
            bookIds.push($(this).data("book-id"))
        }
    });
    // alert(bookIds)

    $.ajax({
        url: 'books/bulk_delete_books',
        type: "DELETE",
        data: { book_ids: bookIds }
    });

});


const pluralize = (counter,string) => {
    if(counter>1){
        return `${counter} ${string}s`
    }else{
        return `${counter} ${string}`
    }
}


$("#master-book-check").on("click",function(){
    $(".book-select-check").prop("checked",$(this).prop("checked"))

    var counter=0
    if($(this).prop("checked")){
        counter=$(".book-select-check").length
        $("#delete-books").text(`Delete ${pluralize(counter,"Book")}`)
        $("#delete-books").show()
    }else{
        $("#delete-books").hide()
    }
});

