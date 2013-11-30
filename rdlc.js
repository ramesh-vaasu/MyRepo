function pageLoad() {
            $(document).ready( function () {
                $( "a").click(function (event) {
                    var href = $(this ).attr('href');
                    if (href.indexOf("ReportOverview.aspx?" ) >= 0 && href.indexOf(",") >= 0) {
                        var href_text = $(this ).text();
                        event.preventDefault();
                        QuestionsWithAnswers(href_text);
                    }
                    if (href.indexOf("ReportOverview.aspx?" ) >= 0 && href.indexOf(",") < 0) {
                        $( this).attr('href' , 'javascript:void(0)');
                        $( this).removeAttr('target' );
                        event.preventDefault();
                    }
                });
            });
        }

function QuestionsWithAnswers(page_Index) {
                var pageIndex = page_Index.slice(0, -1);
                $.ajax({
                    type: "POST",
                    url: "/REOU/WebService/MyReo.asmx/QuestionsWithAnswers" ,
                    data: '{"pageIndex": "' + pageIndex + '"}' ,
                    contentType: "application/json; charset=utf-8" ,
                    dataType: "json",
                    success: CreateTable,
                    failure: function (response) {
                        alert(response.d);
                    },
                    error: function (response) {
                        alert(response.d);
                    }
                });
            }



