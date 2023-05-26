



    'use strict'




    const toggleIcon = document.getElementById('toggleIcon');
    const toggleThemeButton = document.querySelector(".toggle-theme")
    const htmlElement = document.documentElement;
    const theme_element = document.querySelector(".current-theme")

    theme_element.getAttribute('data-bs-theme')


    toggleThemeButton.addEventListener('change', ()=>{
        const themeInStorage = localStorage.getItem("theme");
        console.log("toggled!")
        if(themeInStorage === "dark"){
            localStorage.setItem("theme", "light")
            toggleIcon.classList.remove('bi-moon-fill');
            toggleIcon.classList.add('bi-brightness-high');
            localStorage.setItem("checked", "false")

        }else{
            toggleIcon.classList.remove('bi-brightness-high');
            toggleIcon.classList.add('bi-moon-fill');

            localStorage.setItem("theme", "dark")
            toggleThemeButton.checked = true;
            localStorage.setItem("checked", "true")
        }


        htmlElement.setAttribute('data-bs-theme', localStorage.getItem("theme"));
        // console.log(current_theme_theme.getAttribute('data-bs-theme'))
        // if(current_theme_theme.getAttribute('data-bs-theme') === 'dark'){
        //

        //     htmlElement.setAttribute('data-bs-theme', 'light');
        // }
        // else{

        // }
    })

    const validateInput = document.querySelectorAll(".validate-input")

    validateInput.forEach((e) =>{
        e.addEventListener("input", ()=>{
            e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        })
    })


    const tableSTHr = document.getElementById("table-st-hr")
    const tableSTRate = document.getElementById("table-st-rate")
    const tableSTAmount = document.getElementById("table-st-amount")
    const inputSTHr = document.getElementById("st-hours")
    const inputSTRate = document.getElementById("st-rate")

    const tableOTHr = document.getElementById("table-ot-hr")
    const tableOTRate = document.getElementById("table-ot-rate")
    const tableOTAmount = document.getElementById("table-ot-amount")
    const inputOTHr = document.getElementById("ot-hours")
    const inputOTRate = document.getElementById("ot-rate")

    const tableDTHr = document.getElementById("table-dt-hr")
    const tableDTRate = document.getElementById("table-dt-rate")
    const tableDTAmount = document.getElementById("table-dt-amount")
    const inputDTHr = document.getElementById("dt-hours")
    const inputDTRate = document.getElementById("dt-rate")

    const tableTotal = document.getElementById("table-total");

    const tableTotalText = document.getElementById("table-total-text");

    const calculate = () => {
        const stHR = inputSTHr.value;
        const stRate =  inputSTRate.value;
        const stTotal = stHR * stRate;

        const otHR = inputOTHr.value;
        const otRate =  inputOTRate.value * stRate;
        const otTotal = otHR * (otRate);

        const dtHR = inputDTHr.value;
        const dtRate =  inputDTRate.value * stRate;
        const dtTotal = dtHR * dtRate;

        const total = stTotal + otTotal + dtTotal;


        if(stHR > 0 && stRate > 0) {


            tableSTHr.textContent = stHR.toString();
            tableSTRate.textContent = `$${stRate}`;
            tableSTAmount.textContent = `$${stTotal}`;
        }

        if(otHR > 0 && otRate > 0) {


            tableOTHr.textContent = otHR.toString();
            tableOTRate.textContent = `$${otRate}`;
            tableOTAmount.textContent = `$${otTotal}`;
        }

        if(dtHR > 0 && dtRate > 0) {


            tableDTHr.textContent = dtHR.toString();
            tableDTRate.textContent = `$${dtRate}`;
            tableDTAmount.textContent = `$${dtTotal}`;
        }

        tableTotal.textContent = `$${total}`

        tableTotalText.textContent = `Total gross pay $${total}`;

    }

    const calculateBTN = document.getElementById("calculateButton");
    const collapseTable = document.getElementById("collapseTable");
    const clearBTN = document.getElementById("clearButton");
    const closeBTN = document.querySelectorAll(".close-btn");

    const printBTN = document.getElementById("printBTN");
    const loadingSpinner = document.getElementById("loadingCalculate");

    printBTN.addEventListener("click", ()=>{
        const makePDF = document.getElementById("printable")

        const myWindow = window.open("", "PRINT", "height=600,width=600,top=50,left=50");
        myWindow.document.write(makePDF.innerHTML);
        myWindow.document.close();
        myWindow.focus();
        myWindow.print();
        clear();
        return true;
    })
    calculateBTN.addEventListener("click", e =>{




        const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }else{
                    event.preventDefault();
                    loadingSpinner.removeAttribute('hidden');
                    setTimeout(()=>{

                        loadingSpinner.setAttribute("hidden", "hidden");
                        calculate();
                        collapseTable.classList.add("show")



                    },1000)


                }


            }, false)
        })


        // Loop over them and prevent submission



    })

    const openCollapse = () =>{

    }

    clearBTN.addEventListener("click", () =>{
        clear();
    })

    closeBTN.forEach((e) =>{
        e.addEventListener("click", ()=>{
            clear();

        })
    })



    const clear = () =>{
        tableSTHr.textContent = "";
        tableSTRate.textContent = "";
        tableSTAmount.textContent = "";

        tableOTHr.textContent = "";
        tableOTRate.textContent = "";
        tableOTAmount.textContent = "";

        tableDTHr.textContent = "";
        tableDTRate.textContent = "";
        tableDTAmount.textContent = "";

        tableTotal.textContent = "";


        inputSTHr.value = "";
        inputSTRate.value = "";

        inputOTHr.value = "";
        inputOTRate.value = "2";

        inputDTHr.value = "";
        inputDTRate.value = "1.5";
        collapseTable.classList.remove("show")

    }