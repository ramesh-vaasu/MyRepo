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

function CreateTable(response) {
                var parsedData = JSON.parse(response.d);
                var tableStr = "<table>" ;
                tableStr += "<tr><th>QuestionId</th><th>Questions</th><th>Answers</th></tr>" ;
                $.each(parsedData, function () {
                    tableStr += "<tr><td>" + this .Id + "</td><td>" + this.Questions + "</td><td>" + this.Answers + "</td></tr>";
                });
                tableStr += "</table>";
                $( '#tableQuestions').html(tableStr);
                $( "#tableQuestions").dialog(
                    {
                        modal: true,
                        width: 'auto',
                        height: 'auto'
                    }
                );
            }


