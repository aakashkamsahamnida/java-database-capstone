/* ==============================
   DATA
============================== */

let users = [];
let doctors = [];
let appointments = [];
let prescriptions = [];


/* ==============================
   LOAD DATA
============================== */

async function loadData() {

    try {

        /* USERS */

        const usersResponse =
            await fetch("/api/users");

        if (!usersResponse.ok) {

            throw new Error(
                "Could not load users"
            );
        }

        users =
            await usersResponse.json();


        /* DOCTORS */

        const doctorsResponse =
            await fetch("/api/doctors");

        if (!doctorsResponse.ok) {

            throw new Error(
                "Could not load doctors"
            );
        }

        doctors =
            await doctorsResponse.json();


        /* APPOINTMENTS */

        const appointmentsResponse =
            await fetch(
                "/api/appointments"
            );

        if (!appointmentsResponse.ok) {

            throw new Error(
                "Could not load appointments"
            );
        }

        appointments =
            await appointmentsResponse.json();


        /* PRESCRIPTIONS */

        const prescriptionsResponse =
            await fetch(
                "/api/prescriptions"
            );

        if (!prescriptionsResponse.ok) {

            throw new Error(
                "Could not load prescriptions"
            );
        }

        prescriptions =
            await prescriptionsResponse.json();


        updateDashboard();

        displayPatients();

        displayDoctors();

        displayAppointments();

        displayPrescriptions();

        populateAppointmentSelects();


    } catch (error) {

        console.error(
            "Error loading data:",
            error
        );

        alert(
            "Could not load clinic data. " +
            "Please check that Spring Boot is running."
        );
    }
}


/* ==============================
   DASHBOARD
============================== */

function updateDashboard() {

    const patients =
        users.filter(
            user =>
                user.role === "PATIENT"
        );


    document.getElementById(
        "patientCount"
    ).textContent =
        patients.length;


    document.getElementById(
        "doctorCount"
    ).textContent =
        doctors.length;


    document.getElementById(
        "appointmentCount"
    ).textContent =
        appointments.length;


    document.getElementById(
        "prescriptionCount"
    ).textContent =
        prescriptions.length;


    const tbody =
        document.getElementById(
            "dashboardAppointments"
        );


    tbody.innerHTML = "";


    appointments
        .slice(0, 5)
        .forEach(appointment => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${appointment.patient?.name || "Unknown"}
                </td>

                <td>
                    ${appointment.doctor?.name || "Unknown"}
                </td>

                <td>
                    ${formatDate(
                appointment.appointmentDate
            )}
                </td>

                <td>
                    ${statusBadge(
                appointment.status
            )}
                </td>
            `;


            tbody.appendChild(row);

        });
}


/* ==============================
   PATIENTS
============================== */

function displayPatients(
    filteredUsers = null
) {

    const patients =
        filteredUsers ||
        users.filter(
            user =>
                user.role === "PATIENT"
        );


    const tbody =
        document.getElementById(
            "patientsTable"
        );


    tbody.innerHTML = "";


    if (patients.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="4"
                    class="table-empty">

                    No patients found.

                </td>

            </tr>
        `;

        return;
    }


    patients.forEach(patient => {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML = `

            <td>
                ${patient.id}
            </td>

            <td>
                <strong>
                    ${patient.name}
                </strong>
            </td>

            <td>
                ${patient.email}
            </td>

            <td>

                <span
                    class="status status-scheduled"
                >
                    PATIENT
                </span>

            </td>
        `;


        tbody.appendChild(row);

    });
}


/* ==============================
   SEARCH PATIENTS
============================== */

function searchPatients() {

    const search =
        document
            .getElementById(
                "patientSearch"
            )
            .value
            .toLowerCase()
            .trim();


    const filtered =
        users.filter(user =>

            user.role === "PATIENT"

            &&

            (

                (user.name || "")
                    .toLowerCase()
                    .includes(search)

                ||

                (user.email || "")
                    .toLowerCase()
                    .includes(search)

            )
        );


    displayPatients(
        filtered
    );
}


/* ==============================
   DOCTORS
============================== */

function displayDoctors(
    filteredDoctors = null
) {

    const doctorData =
        filteredDoctors ||
        doctors;


    const grid =
        document.getElementById(
            "doctorsGrid"
        );


    grid.innerHTML = "";


    if (doctorData.length === 0) {

        grid.innerHTML = `

            <div class="empty-message">

                <div class="empty-icon">
                    👨‍⚕️
                </div>

                <h3>
                    No doctors found
                </h3>

                <p>
                    Add a doctor to get started.
                </p>

            </div>
        `;

        return;
    }


    doctorData.forEach(
        doctor => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "doctor-card";


            let availableTimes =
                "Not specified";


            if (
                doctor.availableTimes &&
                doctor.availableTimes.length > 0
            ) {

                availableTimes =
                    doctor
                        .availableTimes
                        .join(", ");
            }


            card.innerHTML = `

                <div class="doctor-avatar">
                    👨‍⚕️
                </div>


                <h3>
                    ${doctor.name || "Doctor"}
                </h3>


                <p
                    class="doctor-specialization"
                >
                    ${doctor.specialization || "General"}
                </p>


                <div class="doctor-details">


                    <p>

                        <strong>
                            📧 Email
                        </strong>

                        <span>
                            ${doctor.email || "-"}
                        </span>

                    </p>


                    <p>

                        <strong>
                            📞 Phone
                        </strong>

                        <span>
                            ${doctor.phone || "-"}
                        </span>

                    </p>


                    <p>

                        <strong>
                            🩺 Specialization
                        </strong>

                        <span>
                            ${doctor.specialization || "General"}
                        </span>

                    </p>


                    <p>

                        <strong>
                            🕐 Available
                        </strong>

                        <span>
                            ${availableTimes}
                        </span>

                    </p>


                </div>


                <span
                    class="status status-completed"
                >
                    AVAILABLE
                </span>

            `;


            grid.appendChild(
                card
            );

        }
    );
}


/* ==============================
   SEARCH DOCTORS
============================== */

function searchDoctors() {

    const search =
        document
            .getElementById(
                "doctorSearch"
            )
            .value
            .toLowerCase()
            .trim();


    const filtered =
        doctors.filter(
            doctor => {

                const name =
                    (
                        doctor.name || ""
                    ).toLowerCase();


                const specialization =
                    (
                        doctor.specialization || ""
                    ).toLowerCase();


                const email =
                    (
                        doctor.email || ""
                    ).toLowerCase();


                const phone =
                    (
                        doctor.phone || ""
                    ).toLowerCase();


                return (

                    name.includes(
                        search
                    )

                    ||

                    specialization.includes(
                        search
                    )

                    ||

                    email.includes(
                        search
                    )

                    ||

                    phone.includes(
                        search
                    )

                );

            }
        );


    displayDoctors(
        filtered
    );
}


/* ==============================
   DOCTOR MODAL
============================== */

function openDoctorModal() {

    document
        .getElementById(
            "doctorModal"
        )
        .classList.add(
        "show"
    );
}


function closeDoctorModal() {

    document
        .getElementById(
            "doctorModal"
        )
        .classList.remove(
        "show"
    );


    document
        .getElementById(
            "doctorForm"
        )
        .reset();
}


/* ==============================
   CREATE DOCTOR
============================== */

document
    .getElementById(
        "doctorForm"
    )
    .addEventListener(
        "submit",

        async function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "doctorName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "doctorEmail"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "doctorPhone"
                    )
                    .value
                    .trim();


            const specialization =
                document
                    .getElementById(
                        "doctorSpecialization"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "doctorPassword"
                    )
                    .value;


            const availableTimesText =
                document
                    .getElementById(
                        "doctorAvailableTimes"
                    )
                    .value
                    .trim();


            const availableTimes =
                availableTimesText

                    ? availableTimesText
                        .split(",")
                        .map(
                            time =>
                                time.trim()
                        )
                        .filter(
                            time =>
                                time !== ""
                        )

                    : [];


            const doctor = {

                name:
                name,

                email:
                email,

                phone:
                phone,

                password:
                password,

                specialization:
                specialization,

                availableTimes:
                availableTimes
            };


            try {

                const response =
                    await fetch(
                        "/api/doctors",
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    doctor
                                )

                        }
                    );


                if (!response.ok) {

                    let errorMessage =
                        "Could not add doctor.";


                    try {

                        const errorData =
                            await response.json();


                        if (
                            errorData.message
                        ) {

                            errorMessage =
                                errorData.message;
                        }

                    } catch (ignored) {

                        console.log(
                            "No JSON error response"
                        );
                    }


                    throw new Error(
                        errorMessage
                    );
                }


                alert(
                    "Doctor added successfully! ✅"
                );


                closeDoctorModal();


                await loadData();


            } catch (error) {

                console.error(
                    "Doctor creation error:",
                    error
                );


                alert(
                    error.message ||
                    "Could not add doctor."
                );

            }

        }
    );


/* ==============================
   APPOINTMENTS
============================== */

function displayAppointments() {

    const tbody =
        document.getElementById(
            "appointmentsTable"
        );


    tbody.innerHTML = "";


    if (
        appointments.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="table-empty"
                >
                    No appointments found.
                </td>

            </tr>
        `;

        return;
    }


    appointments.forEach(
        appointment => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${appointment.id}
                </td>

                <td>
                    ${appointment.patient?.name || "Unknown"}
                </td>

                <td>
                    ${appointment.doctor?.name || "Unknown"}
                </td>

                <td>
                    ${formatDate(
                appointment.appointmentDate
            )}
                </td>

                <td>
                    ${appointment.reason || "-"}
                </td>

                <td>
                    ${statusBadge(
                appointment.status
            )}
                </td>

            `;


            tbody.appendChild(
                row
            );

        }
    );
}


/* ==============================
   PRESCRIPTIONS
============================== */

function displayPrescriptions() {

    const tbody =
        document.getElementById(
            "prescriptionsTable"
        );


    tbody.innerHTML = "";


    if (
        prescriptions.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="table-empty"
                >
                    No prescriptions found.
                </td>

            </tr>
        `;

        return;
    }


    prescriptions.forEach(
        prescription => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${prescription.id}
                </td>

                <td>
                    ${prescription.patientId}
                </td>

                <td>
                    ${prescription.doctorId}
                </td>

                <td>
                    ${prescription.diagnosis || "-"}
                </td>

                <td>
                    ${formatDate(
                prescription.issuedDate
            )}
                </td>

            `;


            tbody.appendChild(
                row
            );

        }
    );
}


/* ==============================
   APPOINTMENT SELECTS
============================== */

function populateAppointmentSelects() {

    const patientSelect =
        document.getElementById(
            "patientSelect"
        );


    const doctorSelect =
        document.getElementById(
            "doctorSelect"
        );


    patientSelect.innerHTML =
        '<option value="">Select patient</option>';


    doctorSelect.innerHTML =
        '<option value="">Select doctor</option>';


    /* PATIENTS */

    users
        .filter(
            user =>
                user.role === "PATIENT"
        )
        .forEach(
            patient => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    patient.id;


                option.textContent =
                    patient.name;


                patientSelect.appendChild(
                    option
                );

            }
        );


    /* DOCTORS */

    doctors.forEach(
        doctor => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                doctor.id;


            option.textContent =
                `${doctor.name} - ${doctor.specialization || "General"}`;


            doctorSelect.appendChild(
                option
            );

        }
    );
}


/* ==============================
   CREATE APPOINTMENT
============================== */

document
    .getElementById(
        "appointmentForm"
    )
    .addEventListener(
        "submit",

        async function(event) {

            event.preventDefault();


            const patientId =
                Number(

                    document
                        .getElementById(
                            "patientSelect"
                        )
                        .value
                );


            const doctorId =
                Number(

                    document
                        .getElementById(
                            "doctorSelect"
                        )
                        .value
                );


            const appointmentDate =
                document
                    .getElementById(
                        "appointmentDate"
                    )
                    .value;


            const reason =
                document
                    .getElementById(
                        "appointmentReason"
                    )
                    .value;


            const status =
                document
                    .getElementById(
                        "appointmentStatus"
                    )
                    .value;


            const patient =
                users.find(

                    user =>
                        user.id ===
                        patientId
                );


            const doctor =
                doctors.find(

                    doctor =>
                        doctor.id ===
                        doctorId
                );


            if (!patient) {

                alert(
                    "Please select a valid patient."
                );

                return;
            }


            if (!doctor) {

                alert(
                    "Please select a valid doctor."
                );

                return;
            }


            const appointment = {

                patient:
                patient,

                doctor:
                doctor,

                appointmentDate:
                appointmentDate,

                status:
                status,

                reason:
                reason
            };


            try {

                const response =
                    await fetch(
                        "/api/appointments",
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    appointment
                                )
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Failed to create appointment"
                    );
                }


                alert(
                    "Appointment created successfully! ✅"
                );


                closeAppointmentModal();


                await loadData();


            } catch (error) {

                console.error(
                    error
                );


                alert(
                    "Could not create appointment."
                );

            }

        }
    );


/* ==============================
   APPOINTMENT MODAL
============================== */

function openAppointmentModal() {

    document
        .getElementById(
            "appointmentModal"
        )
        .classList.add(
        "show"
    );
}


function closeAppointmentModal() {

    document
        .getElementById(
            "appointmentModal"
        )
        .classList.remove(
        "show"
    );


    document
        .getElementById(
            "appointmentForm"
        )
        .reset();
}


/* ==============================
   CLOSE MODALS WHEN CLICKING
   OUTSIDE
============================== */

window.addEventListener(
    "click",

    function(event) {

        const appointmentModal =
            document.getElementById(
                "appointmentModal"
            );


        const doctorModal =
            document.getElementById(
                "doctorModal"
            );


        if (
            event.target ===
            appointmentModal
        ) {

            closeAppointmentModal();
        }


        if (
            event.target ===
            doctorModal
        ) {

            closeDoctorModal();
        }

    }
);


/* ==============================
   NAVIGATION
============================== */

function showPage(
    pageName,
    clickedButton
) {

    document
        .querySelectorAll(
            ".page"
        )
        .forEach(
            page => {

                page.classList.remove(
                    "active-page"
                );

            }
        );


    const selectedPage =
        document.getElementById(
            pageName
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );
    }


    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );
    }


    updatePageTitle(
        pageName
    );
}


/* ==============================
   SHOW PAGE BY NAME
============================== */

function showPageByName(
    pageName
) {

    const buttons =
        document.querySelectorAll(
            ".nav-item"
        );


    let matchingButton =
        null;


    buttons.forEach(
        button => {

            const text =
                button
                    .textContent
                    .toLowerCase();


            if (
                text.includes(
                    pageName.substring(
                        0,
                        5
                    )
                )
            ) {

                matchingButton =
                    button;
            }

        }
    );


    showPage(
        pageName,
        matchingButton
    );
}


/* ==============================
   PAGE TITLE
============================== */

function updatePageTitle(
    pageName
) {

    const titles = {

        dashboard: [

            "Dashboard",

            "Welcome to SmartCare Clinic"

        ],


        patients: [

            "Patients",

            "Manage registered patients"

        ],


        doctors: [

            "Doctors",

            "Manage clinic doctors"

        ],


        appointments: [

            "Appointments",

            "Manage clinic appointments"

        ],


        prescriptions: [

            "Prescriptions",

            "Manage patient prescriptions"

        ]

    };


    const title =
        titles[pageName];


    if (!title) {

        return;
    }


    document.getElementById(
        "pageTitle"
    ).textContent =
        title[0];


    document.getElementById(
        "pageSubtitle"
    ).textContent =
        title[1];
}


/* ==============================
   DATE FORMAT
============================== */

function formatDate(
    dateString
) {

    if (!dateString) {

        return "-";
    }


    const date =
        new Date(
            dateString
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return dateString;
    }


    return date.toLocaleString(
        "en-IN",
        {

            dateStyle:
                "medium",

            timeStyle:
                "short"

        }
    );
}


/* ==============================
   STATUS BADGE
============================== */

function statusBadge(
    status
) {

    const safeStatus =
        status ||
        "UNKNOWN";


    const cssClass =
        safeStatus
            .toLowerCase();


    return `

        <span
            class="
                status
                status-${cssClass}
            "
        >
            ${safeStatus}
        </span>

    `;
}


/* ==============================
   START APPLICATION
============================== */

document.addEventListener(
    "DOMContentLoaded",

    function() {

        loadData();

    }
);