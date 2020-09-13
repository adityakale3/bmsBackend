Login : url/api/login
Fetch : 

        1. Fetch DTA tasks              |        api -> auth -> fetchBasics.js              |       /fetch_task
        2. Fetch Project IDs            |        api -> auth -> fetchBasics.js              |       /fetch_project_ids
        3. Fetch Project Details BY ID  |        api -> auth -> fetchBasics.js              |       /fetch_project_details/:proID
        4. Fetch All Project Tasks      |        api -> auth -> fetchBasics.js              |       /fetch_all_project_tasks                
        5. Fetch Project Tasks By ID    |        api -> auth -> fetchBasics.js              |       /fetch_project_task/:proID               
        6. Fetch Day wise Duration      |        api -> auth -> fetchBasics.js              |       /fetch_day_duration/:dayDate        | Accepts Complete 2020-09-01 Date format, Summary, Field Name Ex. One, Two etc, monthEmp

        DTA

        1. Fetch Months of Emp          |        api -> auth -> fetchDTA.js                 |       /fetch_months
        2. Fetch Monthly Summary        |        api -> auth -> fetchDTA.js                 |       /fetch_monthly_summary/:month       | Accepts 2020-09 Month-Year fromat
        3. Fetch Day wise details       |        api -> auth -> fetchDTA.js                 |       /fetch_day_dta/:dayDate             | Accepts Complete 2020-09-01 Date format  


        POST DTA

        1. POST Day DTA Fill data       |        api -> auth -> postDTA.js                  |       /post_dta                           | Receives Sanitized Data from frontend 
        2. POST DTA submission          |        api -> auth -> postDTA.js                  |       /post_dta_submission                | Receives Sanitized Data from frontend Validate 480 > Mins

