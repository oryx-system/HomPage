export const datastationTranslations: Record<string, { en: string; ru: string }> = {
  "상세 내용 접기": { en: "Collapse details", ru: "Свернуть подробности" },
  "상세 내용 끝": { en: "End of details", ru: "Конец подробностей" },
  "CSV 수집과 데이터 조회": {
    en: "CSV collection and data viewing",
    ru: "Сбор CSV и просмотр данных",
  },
  "장비의 CSV 기록을 자동으로 수집하고, DB 파일로 변환해 저장·검색·조회합니다. 수치와 시간에 따른 변화, 설정값과 실제 측정값을 함께 확인합니다.": {
    en: "Automatically collect equipment records in CSV and convert them into DB files for storage, search and viewing. View values and changes over time, including setpoints and actual measurements.",
    ru: "Автоматически собирайте записи оборудования в формате CSV и преобразуйте их в файлы БД для хранения, поиска и просмотра. Просматривайте значения и их изменения во времени, включая заданные параметры и фактические измерения.",
  },
  "장비 원본 기록 수집": {
    en: "Collect original equipment records",
    ru: "Сбор исходных записей оборудования",
  },
  "DB 변환과 조회": {
    en: "DB conversion and viewing",
    ru: "Преобразование в БД и просмотр",
  },
  "검토·인쇄용 PDF 보고서 생성": {
    en: "Generate PDF reports for review and printing",
    ru: "Создание PDF-отчётов для проверки и печати",
  },
  "파일 보호와 접근 권한": {
    en: "File protection and access permissions",
    ru: "Защита файлов и права доступа",
  },
  "새로 생성하는 CSV·DB·PDF 파일에 암호화와 파일 접근 권한을 적용해 허용되지 않은 열람과 수정을 제한합니다.": {
    en: "Apply encryption and file access permissions to newly created CSV, DB and PDF files to restrict unauthorized viewing and editing.",
    ru: "К новым файлам CSV, БД и PDF применяются шифрование и права доступа, ограничивающие несанкционированный просмотр и изменение.",
  },
  "새 파일의 암호화·접근 제한": {
    en: "Encrypt new files and restrict access",
    ru: "Шифрование новых файлов и ограничение доступа",
  },
  "기존 비암호화 CSV·DB도 처리": {
    en: "Also process existing unencrypted CSV and DB files",
    ru: "Обработка существующих незашифрованных файлов CSV и БД",
  },
  "역할별 접근과 운영 설정": {
    en: "Role-based access and operational settings",
    ru: "Доступ по ролям и рабочие настройки",
  },
  "원본 확인과 버전 구분": {
    en: "Original comparison and version tracking",
    ru: "Сравнение с оригиналом и учёт версий",
  },
  "보관한 원본의 해시값과 비교해 파일의 변경 여부를 확인합니다. CSV·DB 파일명과 디지털 지문을 PDF에 함께 남깁니다.": {
    en: "Compare a file's hash with the stored original's hash to check for changes. CSV and DB filenames and their digital fingerprints are included in the PDF.",
    ru: "Сравнивайте хеш-значение файла с хеш-значением сохранённого оригинала, чтобы проверить наличие изменений. В PDF также включаются имена файлов CSV и БД и их цифровые отпечатки.",
  },
  "발행 원본과 해시값 비교": {
    en: "Compare with the originally issued file's hash",
    ru: "Сравнение с хеш-значением первоначально выпущенного файла",
  },
  "최초 보고서와 이후 버전 보관": {
    en: "Retain the first report and later versions",
    ru: "Хранение первого отчёта и последующих версий",
  },
  "서명한 PDF는 앱에서 재생성 불가": {
    en: "Signed PDFs cannot be regenerated in the app",
    ru: "PDF с электронной подписью нельзя повторно создать в приложении",
  },
  "장비·프로그램 활동 이력": {
    en: "Equipment and application activity history",
    ru: "История действий оборудования и приложения",
  },
  "연결된 장비의 작업·변경 이력(Audit Trail)을 가져와 조회하고 보고서로 내보냅니다. 프로그램 사용과 시스템 동작 이력도 기록합니다.": {
    en: "Import and view the operation and change history (Audit Trail) of connected equipment, and export it as reports. Application usage and system activity are also recorded.",
    ru: "Импортируйте и просматривайте историю операций и изменений подключённого оборудования (Audit Trail) и экспортируйте её в отчёты. Также регистрируются использование приложения и действия системы.",
  },
  "연결 장비의 Audit Trail 조회·내보내기": {
    en: "View and export connected equipment's Audit Trail",
    ru: "Просмотр и экспорт Audit Trail подключённого оборудования",
  },
  "프로그램·시스템 활동 기록": {
    en: "Record application and system activity",
    ru: "Регистрация действий приложения и системы",
  },
  "필요 항목과 전체 이력 확인": {
    en: "View selected entries and the full history",
    ru: "Просмотр выбранных записей и полной истории",
  },
  "정기 백업과 선택 복원": {
    en: "Scheduled backup and selective restoration",
    ru: "Плановое резервное копирование и выборочное восстановление",
  },
  "기록과 설정의 백업 대상, 경로와 일정을 정하고 정기적으로 보관합니다. 복원할 때에는 필요한 범위를 선택합니다.": {
    en: "Set the scope, location and schedule for regular backups of records and settings. Select the required scope when restoring.",
    ru: "Задайте состав, путь и расписание резервного копирования записей и настроек. При восстановлении выберите необходимый объём данных.",
  },
  "백업 대상·경로·실행 일정 설정": {
    en: "Set backup scope, location and schedule",
    ru: "Настройка состава, пути и расписания копирования",
  },
  "필요 범위 선택 복원": {
    en: "Select the required scope to restore",
    ru: "Восстановление выбранного объёма данных",
  },
  "NAS·서버 공유 경로·USB 등 외부 보관": {
    en: "External storage on NAS, server shares or USB devices",
    ru: "Внешнее хранение на NAS, сетевых ресурсах сервера или USB-носителях",
  },
  "장기 보관과 PC 시간 맞춤": {
    en: "Long-term retention and PC clock synchronization",
    ru: "Долгосрочное хранение и синхронизация часов ПК",
  },
  "보관 기간을 설정하고 외부 보관 확인 후 PC 정리 정책을 적용합니다. 각 설치 PC는 지정한 NTP 시간 서버를 참조해 자신의 시간을 맞춥니다.": {
    en: "Set retention periods and apply the PC cleanup policy after confirming external storage. Each PC running DataStation synchronizes its own clock with the specified NTP time server.",
    ru: "Задайте сроки хранения и применяйте политику очистки ПК после подтверждения внешнего сохранения. Каждый ПК с установленным DataStation синхронизирует собственные часы с указанным NTP-сервером.",
  },
  "보관 기간과 PC 정리 정책 설정": {
    en: "Set retention periods and the PC cleanup policy",
    ru: "Настройка сроков хранения и политики очистки ПК",
  },
  "설치 PC별 NTP 시간 동기화": {
    en: "NTP clock synchronization for each installation PC",
    ru: "Синхронизация часов каждого ПК с NTP-сервером",
  },
  "현장 운영 기준에 맞춘 설정": {
    en: "Settings aligned with site operating requirements",
    ru: "Настройки в соответствии с рабочими требованиями объекта",
  },
  "CSV · 장비 원본 기록": {
    en: "CSV · Original equipment records",
    ru: "CSV · Исходные записи оборудования",
  },
  "자동 수집하는 원본 데이터": {
    en: "Automatically collected source data",
    ru: "Автоматический сбор исходных данных",
  },
  "DB · 저장과 조회": {
    en: "DB · Storage and viewing",
    ru: "DB · Хранение и просмотр",
  },
  "기록을 변환해 검색·조회": {
    en: "Convert records for search and viewing",
    ru: "Преобразование записей для поиска и просмотра",
  },
  "PDF · 검토 보고서": {
    en: "PDF · Reports for review",
    ru: "PDF · Отчёты для проверки",
  },
  "보고서 생성과 검토·인쇄": {
    en: "Generate, review and print reports",
    ru: "Создание, проверка и печать отчётов",
  },
  "RECORD FLOW": {
    en: "RECORD FLOW",
    ru: "ОБРАБОТКА ЗАПИСЕЙ",
  },
  "파일 보호": {
    en: "File protection",
    ru: "Защита файлов",
  },
  "원본 확인": {
    en: "Original comparison",
    ru: "Сравнение с оригиналом",
  },
  "이력 관리": {
    en: "History management",
    ru: "Учёт истории",
  },
  "기록 처리 흐름을 설명하는 개념도입니다. 실제 제품 화면이 아닙니다.": {
    en: "Conceptual record-processing flow. This is not an actual product screen.",
    ru: "Схема обработки записей. Это не фактический экран продукта.",
  },
  "Oryx DataStation 도입 문의": {
    en: "Oryx DataStation implementation inquiry",
    ru: "Запрос о внедрении Oryx DataStation",
  },
  "EQUIPMENT DATA MANAGEMENT": {
    en: "EQUIPMENT DATA MANAGEMENT",
    ru: "УПРАВЛЕНИЕ ДАННЫМИ ОБОРУДОВАНИЯ",
  },
  "설비의 기록을, 검토 가능한 데이터로.": {
    en: "Turn equipment records into reviewable data.",
    ru: "От записей оборудования к данным для проверки.",
  },
  "장비의 CSV 기록을 수집하고 DB로 변환해 관리합니다. PDF 보고서, 변경 확인과 감사 이력, 전자서명으로 기록의 수집부터 검토·보관까지 연결하는 장비 데이터 관리 소프트웨어입니다.": {
    en: "Collect equipment records in CSV and manage them as DB files. This equipment data management software connects collection, review and retention through PDF reports, change checks, audit history and electronic signatures.",
    ru: "Собирайте записи оборудования в CSV и управляйте ими в файлах БД. Это ПО для управления данными оборудования объединяет сбор, проверку и хранение записей с помощью PDF-отчётов, проверки изменений, истории аудита и электронных подписей.",
  },
  "DataStation 도입 문의": {
    en: "Discuss DataStation implementation",
    ru: "Обсудить внедрение DataStation",
  },
  "제품 소개서 보기": {
    en: "View product brochures",
    ru: "Смотреть брошюры",
  },
  "DataStation 제품 소개서에 근거한 기능 안내입니다.": {
    en: "This feature overview is based on the DataStation product brochure.",
    ru: "Описание функций основано на брошюре DataStation.",
  },
  "전자서명과 원격 검토 기능은 제품 구성에 따라 다릅니다.": {
    en: "Electronic signature and remote review features depend on the product edition.",
    ru: "Функции электронной подписи и удалённой проверки зависят от редакции продукта.",
  },
  "수집 · 보호 · 보고서 · 검토 · 보관": {
    en: "Collect · Protect · Report · Review · Retain",
    ru: "Сбор · Защита · Отчёты · Проверка · Хранение",
  },
  "DataStation은 기록 관리 소프트웨어입니다. 설비 제어기·조작 화면(PLC/HMI) 프로그램은 DataStation의 기능 범위에 포함되지 않습니다.": {
    en: "DataStation is record management software. Equipment control and operator interface programs (PLC/HMI) are outside DataStation's scope.",
    ru: "DataStation — программное обеспечение для управления записями. Программы управления оборудованием и операторских интерфейсов (PLC/HMI) не входят в функции DataStation.",
  },
  "COLLECT & PROTECT": {
    en: "COLLECT & PROTECT",
    ru: "СБОР И ЗАЩИТА",
  },
  "기록의 출처와 이력을 함께 관리합니다.": {
    en: "Manage the source and history of your records.",
    ru: "Управляйте происхождением и историей записей.",
  },
  "수집한 파일을 찾고, 변경 여부를 확인하고, 필요한 기록을 보관하는 기능을 제공합니다.": {
    en: "Find collected files, check for changes and retain the records you need.",
    ru: "Находите собранные файлы, проверяйте наличие изменений и сохраняйте необходимые записи.",
  },
  "REPORT & REVIEW": {
    en: "REPORT & REVIEW",
    ru: "ОТЧЁТЫ И ПРОВЕРКА",
  },
  "검토 목적에 맞춰 보고서를 구성합니다.": {
    en: "Configure reports for the purpose of your review.",
    ru: "Настраивайте отчёты под задачи проверки.",
  },
  "적합·부적합 판정에 따른 로우 데이터 출력으로 예외 중심 검토(Review by Exception)를 돕습니다.": {
    en: "Raw data output based on PASS or FAIL results supports Review by Exception.",
    ru: "Вывод необработанных данных в зависимости от результата PASS или FAIL помогает выполнять проверку по исключениям (Review by Exception).",
  },
  "PASS · 적합 판정": {
    en: "PASS · Conforming result",
    ru: "PASS · Соответствует",
  },
  "설정에 따라 상세 출력 생략": {
    en: "Omit detailed output when configured",
    ru: "Отключение вывода подробных данных по настройке",
  },
  "적합 판정에서는 설정에 따라 로우 데이터(원시 측정값)의 출력을 생략합니다. 수동 재발행 시에는 포함 여부를 선택할 수 있습니다.": {
    en: "For a PASS result, raw data (original measurements) can be omitted from the report when configured. When manually reissuing a report, you can choose whether to include it.",
    ru: "При результате PASS вывод необработанных данных (исходных измерений) в отчёт можно отключить настройкой. При ручном повторном выпуске отчёта можно выбрать, включать ли эти данные.",
  },
  "FAIL · 부적합 판정": {
    en: "FAIL · Nonconforming result",
    ru: "FAIL · Не соответствует",
  },
  "로우 데이터를 항상 포함": {
    en: "Always include raw data",
    ru: "Обязательное включение необработанных данных",
  },
  "부적합 판정에서는 로우 데이터를 항상 포함해 상세 기록을 확인하도록 합니다. 출력 보고서와 별도로 원본 데이터는 보존합니다.": {
    en: "For a FAIL result, raw data is always included so that detailed records can be reviewed. Original data is preserved separately from the output report.",
    ru: "При результате FAIL необработанные данные всегда включаются в отчёт для проверки подробных записей. Исходные данные сохраняются отдельно от сформированного отчёта.",
  },
  "현장에 맞는 양식": {
    en: "Forms tailored to the site",
    ru: "Формы с учётом требований объекта",
  },
  "한국어·영어 및 날짜 표시를 선택하고, 장비·공정에 맞춰 공급자가 보고서 양식을 구성합니다.": {
    en: "Choose Korean or English and the date format. The supplier configures report forms for the equipment and process.",
    ru: "Выберите корейский или английский язык и формат даты. Поставщик настраивает формы отчётов под оборудование и процесс.",
  },
  "조건에 따른 인쇄": {
    en: "Condition-based printing",
    ru: "Печать по заданным условиям",
  },
  "자동 인쇄는 설정한 판정 조건과 Windows 기본 프린터를 사용합니다.": {
    en: "Automatic printing uses the configured result conditions and the Windows default printer.",
    ru: "Автоматическая печать использует заданные условия оценки результата и принтер Windows по умолчанию.",
  },
  "지원 보고서의 점검 안내": {
    en: "Inspection guidance in supported reports",
    ru: "Рекомендации в поддерживаемых отчётах",
  },
  "과거 이력에 따른 예방 점검 권고를 표시하며, 판정 결과를 바꾸지는 않습니다.": {
    en: "Preventive inspection recommendations based on past records are displayed without changing the result.",
    ru: "Рекомендации по профилактической проверке на основе предыдущих записей отображаются без изменения результата оценки.",
  },
  "로우 데이터 포함 선택은 해당 수동 보고서에만 적용됩니다. 최초 보고서는 보존하며, 이후 보고서는 별도 버전으로 남깁니다.": {
    en: "The raw data inclusion choice applies only to that manually generated report. The first report is preserved, and later reports are retained as separate versions.",
    ru: "Выбор включения необработанных данных применяется только к конкретному отчёту, созданному вручную. Первый отчёт сохраняется, а последующие остаются отдельными версиями.",
  },
  "ROLE-BASED ELECTRONIC SIGNATURES": {
    en: "ROLE-BASED ELECTRONIC SIGNATURES",
    ru: "ЭЛЕКТРОННЫЕ ПОДПИСИ ПО РОЛЯМ",
  },
  "작업·확인·승인의 책임을 구분합니다.": {
    en: "Separate responsibilities for operation, review and approval.",
    ru: "Разделяйте ответственность за выполнение, проверку и утверждение.",
  },
  "Professional·Enterprise는 담당자 역할과 순서에 따른 전자서명을 제공합니다.": {
    en: "Professional and Enterprise provide electronic signatures according to assigned roles and the required sequence.",
    ru: "Professional и Enterprise поддерживают электронные подписи в соответствии с назначенными ролями и установленной последовательностью.",
  },
  "01 / 작업자": {
    en: "01 / OPERATOR",
    ru: "01 / ОПЕРАТОР",
  },
  "작업자": {
    en: "Operator",
    ru: "Оператор",
  },
  "작업 기록을 확인하고 첫 번째 전자서명을 남깁니다.": {
    en: "Checks the operation record and applies the first electronic signature.",
    ru: "Проверяет запись о выполненной операции и ставит первую электронную подпись.",
  },
  "02 / 확인자": {
    en: "02 / VERIFIER",
    ru: "02 / ПРОВЕРЯЮЩИЙ",
  },
  "확인자": {
    en: "Verifier",
    ru: "Проверяющий",
  },
  "작업자의 서명 후 기록을 검토하고 확인 서명을 남깁니다.": {
    en: "Reviews the record after the Operator's signature and applies the review signature.",
    ru: "Проверяет запись после подписи Оператора и ставит подпись о проверке.",
  },
  "03 / 승인자": {
    en: "03 / APPROVER",
    ru: "03 / УТВЕРЖДАЮЩИЙ",
  },
  "승인자": {
    en: "Approver",
    ru: "Утверждающий",
  },
  "확인 서명 후 최종 검토하고 승인 서명을 남깁니다.": {
    en: "Performs the final review after the review signature and applies the approval signature.",
    ru: "Выполняет итоговую проверку после подписи Проверяющего и ставит подпись об утверждении.",
  },
  "감사자": {
    en: "Auditor",
    ru: "Аудитор",
  },
  "기록과 감사 이력을 조회·내보냅니다. 감사자 권한만으로는 서명하지 않으며, 승인에는 승인자 역할이 필요합니다.": {
    en: "Views and exports records and audit history. Auditor permissions alone do not allow signing; approval requires the Approver role.",
    ru: "Просматривает и экспортирует записи и историю аудита. Одних прав Аудитора недостаточно для подписания; для утверждения требуется роль Утверждающего.",
  },
  "관리자": {
    en: "Administrator",
    ru: "Администратор",
  },
  "계정·권한·운영 설정과 백업을 관리합니다. 비밀번호, 미사용 시간과 계정 잠금 기준을 설정합니다.": {
    en: "Manages accounts, permissions, operational settings and backups. Sets password, inactivity and account lockout criteria.",
    ru: "Управляет учётными записями, правами, рабочими настройками и резервным копированием. Задаёт требования к паролям, времени бездействия и блокировке учётных записей.",
  },
  "ENTERPRISE · REMOTE REVIEW": {
    en: "ENTERPRISE · REMOTE REVIEW",
    ru: "ENTERPRISE · УДАЛЁННАЯ ПРОВЕРКА",
  },
  "현장의 기록을, 사무실에서 조회하고 검토합니다.": {
    en: "View and review site records from the office.",
    ru: "Просматривайте и проверяйте записи объекта из офиса.",
  },
  "Enterprise는 현장 DataStation이 보관한 기록을 사무실에서 조회·검토하는 구성입니다. 별도 보관함에서 PDF 보고서와 서명 이력을 모아 확인합니다.": {
    en: "Enterprise enables office-based viewing and review of records stored by the site's DataStation. PDF reports and signature history can be viewed together in a separate repository.",
    ru: "Enterprise позволяет из офиса просматривать и проверять записи, сохранённые DataStation на объекте. PDF-отчёты и историю подписей можно просматривать вместе в отдельном хранилище.",
  },
  "도입 시 현장 PC, 사무실 검토 환경과 연결 조건을 함께 확인합니다.": {
    en: "Confirm the site PC, office review environment and connection requirements during implementation.",
    ru: "При внедрении уточняются параметры ПК объекта, среды проверки в офисе и условия подключения.",
  },
  "기록과 검토 업무의 연결": {
    en: "Connect records with review workflows",
    ru: "Связь записей и процессов проверки",
  },
  "현장 DataStation의 보관 기록 조회·검토": {
    en: "View and review records stored by the site's DataStation",
    ru: "Просмотр и проверка записей, сохранённых DataStation на объекте",
  },
  "PDF·서명 이력 전용 보관함": {
    en: "Dedicated repository for PDFs and signature history",
    ru: "Отдельное хранилище PDF и истории подписей",
  },
  "작업·확인·승인 순서별 전자서명": {
    en: "Sequential Operator, Verifier and Approver signatures",
    ru: "Последовательные подписи Оператора, Проверяющего и Утверждающего",
  },
  "CHOOSE YOUR CONFIGURATION": {
    en: "CHOOSE YOUR CONFIGURATION",
    ru: "ВЫБЕРИТЕ КОНФИГУРАЦИЮ",
  },
  "업무 범위에 맞는 구성을 선택합니다.": {
    en: "Choose the edition that fits your workflow.",
    ru: "Выберите редакцию под ваши задачи.",
  },
  "전자서명과 사무실 검토, 전용 보관의 필요에 따라 Standard·Professional·Enterprise를 검토합니다.": {
    en: "Consider Standard, Professional or Enterprise based on your need for electronic signatures, office-based review and a dedicated repository.",
    ru: "Выбирайте Standard, Professional или Enterprise с учётом необходимости электронных подписей, проверки из офиса и отдельного хранилища.",
  },
  "비교표가 화면보다 넓으면 좌우로 스크롤하세요.": {
    en: "Scroll horizontally if the comparison table is wider than your screen.",
    ru: "Если таблица шире экрана, прокрутите её по горизонтали.",
  },
  "DataStation 제품 구성 비교표 (좌우 스크롤 가능)": {
    en: "DataStation edition comparison table (horizontal scrolling available)",
    ru: "Сравнение редакций DataStation (доступна горизонтальная прокрутка)",
  },
  "DataStation 제품 구성별 역할, 전자서명 및 기록 검토 기능 비교": {
    en: "Comparison of roles, electronic signatures and record review features by DataStation edition",
    ru: "Сравнение ролей, электронных подписей и функций проверки записей в редакциях DataStation",
  },
  "구분": {
    en: "Feature",
    ru: "Функция",
  },
  "주요 운영 목적": {
    en: "Primary purpose",
    ru: "Основное назначение",
  },
  "현장 기록 관리": {
    en: "Site record management",
    ru: "Управление записями на объекте",
  },
  "현장 기록 관리·서명": {
    en: "Site record management and signing",
    ru: "Управление записями и подписание на объекте",
  },
  "사무실 원격 조회·검토": {
    en: "Remote viewing and review from the office",
    ru: "Удалённый просмотр и проверка из офиса",
  },
  "계정 역할": {
    en: "Account roles",
    ru: "Роли учётных записей",
  },
  "관리자·감사자": {
    en: "Administrator and Auditor",
    ru: "Администратор и Аудитор",
  },
  "서명·관리 역할 추가": {
    en: "Additional signing and management roles",
    ru: "Дополнительные роли подписания и управления",
  },
  "전자서명": {
    en: "Electronic signatures",
    ru: "Электронные подписи",
  },
  "미제공": {
    en: "Not provided",
    ru: "Не предоставляется",
  },
  "제공": {
    en: "Provided",
    ru: "Предоставляется",
  },
  "기록 조회·검토 환경": {
    en: "Record viewing and review environment",
    ru: "Среда просмотра и проверки записей",
  },
  "현장 PC에서 연동": {
    en: "Integration on the site PC",
    ru: "Интеграция на ПК объекта",
  },
  "사무실에서 검토": {
    en: "Review from the office",
    ru: "Проверка из офиса",
  },
  "Professional도 전자서명한 보고서를 저장합니다. Enterprise의 별도 PDF·서명 이력 보관함과는 구분됩니다. 앱 전체 화면의 한국어·영어 전환을 지원합니다.": {
    en: "Professional also stores electronically signed reports. This differs from Enterprise's separate repository for PDFs and signature history. The application supports switching all screens between Korean and English.",
    ru: "Professional также сохраняет отчёты с электронной подписью. Это отличается от отдельного хранилища PDF и истории подписей в Enterprise. Приложение поддерживает переключение всех экранов между корейским и английским языками.",
  },
  "FUNCTIONS & VALIDATION": {
    en: "FUNCTIONS & VALIDATION",
    ru: "ФУНКЦИИ И ВАЛИДАЦИЯ",
  },
  "지원 기능과 현장 검증을 함께 확인합니다.": {
    en: "Assess supporting functions alongside site validation.",
    ru: "Оценивайте поддерживающие функции вместе с валидацией на объекте.",
  },
  "21 CFR PART 11 · ALCOA+": {
    en: "21 CFR PART 11 · ALCOA+",
    ru: "21 CFR PART 11 · ALCOA+",
  },
  "규제·무결성 요구를 지원하는 기능": {
    en: "Functions supporting regulatory and integrity requirements",
    ru: "Функции для поддержки требований к соблюдению норм и целостности данных",
  },
  "기록 보호, 원본 확인, 활동 이력, 역할별 권한과 전자서명은 전자기록 및 데이터 무결성 요구를 검토하는 데 활용할 수 있습니다.": {
    en: "Record protection, original comparison, activity history, role-based permissions and electronic signatures can support the assessment of electronic record and data integrity requirements.",
    ru: "Защита записей, сравнение с оригиналом, история действий, права по ролям и электронные подписи могут использоваться при оценке требований к электронным записям и целостности данных.",
  },
  "실제 적합성은 제품 설정과 고객의 운영 절차, 교육, 검증을 함께 평가해야 합니다. 제품 도입만으로 인증이나 규제 준수가 보장되지는 않습니다.": {
    en: "Actual compliance requires assessment of product settings together with the customer's operating procedures, training and validation. Product implementation alone does not guarantee certification or regulatory compliance.",
    ru: "Фактическое соответствие необходимо оценивать с учётом настроек продукта, рабочих процедур заказчика, обучения и валидации. Само внедрение продукта не гарантирует сертификацию или соблюдение нормативных требований.",
  },
  "검토 가이드 보기": {
    en: "View the review guide",
    ru: "Открыть руководство по оценке",
  },
  "SEPARATE SOLUTION · ORYX LOCKDOWN": {
    en: "SEPARATE SOLUTION · ORYX LOCKDOWN",
    ru: "ОТДЕЛЬНОЕ РЕШЕНИЕ · ORYX LOCKDOWN",
  },
  "업무 전용 Windows 환경은 별도 솔루션입니다.": {
    en: "The dedicated Windows work environment is a separate solution.",
    ru: "Рабочая среда Windows для определённых задач — отдельное решение.",
  },
  "Oryx LockDown은 허용 앱 중심의 Windows 업무 환경을 제공하고 바탕화면 접근과 설정된 Windows 단축키를 제한하는 별도 제품입니다.": {
    en: "Oryx LockDown is a separate product that provides a Windows work environment centered on allowed apps and restricts desktop access and configured Windows shortcuts.",
    ru: "Oryx LockDown — отдельный продукт, создающий рабочую среду Windows с разрешёнными приложениями и ограничивающий доступ к рабочему столу и заданные сочетания клавиш Windows.",
  },
  "DataStation의 기록 관리 기능과 구분해 적용 범위를 검토합니다.": {
    en: "Assess its scope separately from DataStation's record management functions.",
    ru: "Область применения оценивается отдельно от функций управления записями DataStation.",
  },
  "LockDown 소개서 확인": {
    en: "View the LockDown brochure",
    ru: "Смотреть брошюру LockDown",
  },
  "도입 전에 확인할 사항": {
    en: "What to confirm before implementation",
    ru: "Что уточнить до внедрения",
  },
  "대상 장비의 CSV 형식과 연결 조건, 보고서 양식, 사용자 역할, 파일 보호 범위, 백업·보관 정책과 검증 요구를 함께 확인합니다. 제공 버전, 구성과 지원 범위는 상담 및 계약에서 정합니다.": {
    en: "Confirm the equipment's CSV format and connection requirements, report forms, user roles, file protection scope, backup and retention policies, and validation needs. The supplied version, configuration and support scope are agreed during consultation and in the contract.",
    ru: "Уточняются формат CSV и условия подключения оборудования, формы отчётов, роли пользователей, область защиты файлов, политики резервного копирования и хранения, а также требования к валидации. Поставляемая версия, конфигурация и объём поддержки определяются при консультации и в договоре.",
  },
  "NEXT STEP": {
    en: "NEXT STEP",
    ru: "СЛЕДУЮЩИЙ ШАГ",
  },
  "현장의 기록 흐름에 맞춰 검토하세요.": {
    en: "Assess the solution for your site's record workflow.",
    ru: "Оцените решение с учётом движения записей на вашем объекте.",
  },
  "제품 소개서를 확인하거나, 대상 장비와 필요한 업무 범위를 알려주세요.": {
    en: "View the product brochure or tell us about the equipment and workflow you need to support.",
    ru: "Ознакомьтесь с брошюрой или сообщите об оборудовании и задачах, которые необходимо поддержать.",
  },
  "자료 확인": {
    en: "View materials",
    ru: "Смотреть материалы",
  },
  "메일로 도입 문의": {
    en: "Email an implementation inquiry",
    ru: "Запросить внедрение по почте",
  },
  "장비 CSV를 자동 수집해 DB로 저장·조회하고 PDF 보고서를 만듭니다.": {"en": "Collect equipment CSV files, store and view them in a database, and generate PDF reports.", "ru": "Сбор CSV оборудования, хранение и просмотр в базе данных, создание PDF-отчётов."},
  "새 CSV·DB·PDF 파일에 암호화와 접근 권한을 적용합니다.": {"en": "Apply encryption and access permissions to new CSV, DB and PDF files.", "ru": "Шифрование и права доступа для новых файлов CSV, DB и PDF."},
  "원본 해시값으로 변경을 확인하고 최초 보고서와 이후 버전을 보관합니다.": {"en": "Check changes against the original hash and retain the first report and later versions.", "ru": "Проверка изменений по хешу оригинала и хранение первого отчёта и последующих версий."},
  "연결 장비의 Audit Trail을 조회·내보내고 프로그램·시스템 활동을 기록합니다.": {"en": "View and export connected equipment’s Audit Trail and record application and system activity.", "ru": "Просмотр и экспорт Audit Trail подключённого оборудования, запись действий программы и системы."},
  "대상·경로·일정을 정해 백업하고 필요한 범위를 선택해 복원합니다.": {"en": "Set backup scope, location and schedule; restore the records you need.", "ru": "Настройка состава, пути и расписания резервного копирования; выборочное восстановление."},
  "외부 보관 확인 후 PC 정리 정책을 적용하고, 설치 PC별로 NTP 시간을 맞춥니다.": {"en": "Apply PC cleanup policies after confirming external retention; synchronize each installation with an NTP server.", "ru": "Очистка ПК после подтверждения внешнего хранения; синхронизация каждого ПК с NTP-сервером."},
  "장비 CSV를 수집·보호하고 PDF 보고서로 검토·보관합니다. 전자서명과 사무실 검토는 제품 구성에 따라 제공합니다.": {"en": "Collect and protect equipment CSV records, then review and retain PDF reports. Electronic signatures and office review depend on configuration.", "ru": "Сбор и защита CSV оборудования, проверка и хранение PDF-отчётов. Электронные подписи и проверка из офиса зависят от комплектации."},
  "DataStation 핵심 흐름": {"en": "DataStation record workflow", "ru": "Основные этапы DataStation"},
  "수집": {"en": "Collect", "ru": "Сбор"},
  "보호": {"en": "Protect", "ru": "Защита"},
  "검토": {"en": "Review", "ru": "Проверка"},
  "보관": {"en": "Retain", "ru": "Хранение"},
  "CSV 수집 · DB 조회": {"en": "CSV collection · database access", "ru": "Сбор CSV · просмотр БД"},
  "파일 보호 · 변경 확인": {"en": "File protection · change checks", "ru": "Защита файлов · проверка изменений"},
  "PDF 보고서 · 역할별 서명": {"en": "PDF reports · role-based signatures", "ru": "PDF-отчёты · подписи по ролям"},
  "백업 · 선택 복원": {"en": "Backup · selective restore", "ru": "Резервное копирование · восстановление"},
  "전자서명은 Professional·Enterprise에서 제공합니다. 장비 연결과 지원 범위는 현장 구성에 따라 확인합니다.": {"en": "Electronic signatures are available in Professional and Enterprise. Equipment connections and support scope must be reviewed for the site configuration.", "ru": "Электронные подписи доступны в Professional и Enterprise. Подключение оборудования и объём поддержки уточняются для конкретной конфигурации объекта."},
  "보고서·역할·원격 검토 자세히 보기": {"en": "Report settings, roles and remote review details", "ru": "Настройки отчётов, роли и удалённая проверка"},
  "파일·보관 설정의 적용 조건": {"en": "File protection and retention settings", "ru": "Условия защиты файлов и хранения"},
  "기존 비암호화 CSV·DB도 처리하며, 새 파일의 보호 범위와 역할별 권한은 설정에 따라 확인합니다.": {"en": "Existing unencrypted CSV and DB files can also be processed. Confirm new-file protection and role permissions in the configuration.", "ru": "Обрабатываются и существующие незашифрованные CSV и DB. Защиту новых файлов и права ролей проверяют в настройках."},
  "CSV·DB 파일명과 디지털 지문을 PDF에 남깁니다. 전자서명한 PDF는 앱에서 다시 생성할 수 없습니다.": {"en": "PDFs include CSV and DB filenames and digital fingerprints. Signed PDFs cannot be regenerated in the app.", "ru": "В PDF сохраняются имена CSV и DB и цифровые отпечатки. Подписанный PDF нельзя сформировать заново в приложении."},
  "수치·시간 변화와 설정값·측정값을 비교하고, 필요한 항목 또는 전체 이력을 확인합니다.": {"en": "Compare values over time and setpoints with measurements; review selected entries or the complete history.", "ru": "Сравнение значений во времени и заданных параметров с измерениями; просмотр выбранных записей или всей истории."},
  "NAS·서버 공유 경로·USB 등 외부 보관 경로와 보관 기간, NTP 서버는 현장 운영 기준에 맞춰 설정합니다.": {"en": "Configure external storage such as NAS, server shares or USB, retention periods and the NTP server for your operating requirements.", "ru": "Пути внешнего хранения — NAS, общие папки сервера или USB, сроки хранения и NTP-сервер настраиваются по требованиям объекта."},
  "제품 구성 핵심 차이": {"en": "Configuration differences at a glance", "ru": "Основные различия комплектаций"},
  "현장 기록 관리 · 전자서명 미제공": {"en": "On-site records · no electronic signatures", "ru": "Записи на объекте · без электронных подписей"},
  "현장 기록 관리 · 역할별 전자서명": {"en": "On-site records · role-based signatures", "ru": "Записи на объекте · подписи по ролям"},
  "사무실 원격 조회·검토 · 전자서명 · 전용 보관함": {"en": "Office review · signatures · dedicated archive", "ru": "Проверка из офиса · подписи · отдельное хранилище"},
  "규제 기준과 적용 범위 자세히 보기": {"en": "Regulatory references and scope details", "ru": "Нормативные ориентиры и область применения"},
  "LockDown 도입 문의": {"en": "Discuss LockDown", "ru": "Обсудить LockDown"},
  "Calibration 도입 문의": {"en": "Discuss Calibration", "ru": "Обсудить Calibration"},
  "장비 기록,": {"en": "Equipment records.", "ru": "Записи оборудования."},
  "PC 접근,": {"en": "PC access.", "ru": "Доступ к ПК."},
  "교정 업무.": {"en": "Calibration workflows.", "ru": "Калибровка."},
  "장비 기록·PC 접근·교정 업무를 관리하는 소프트웨어를 개발합니다. 기능과 적용 범위는 현장 요구에 맞춰 확인합니다.": {"en": "We develop software for equipment records, PC access and calibration workflows. Features and scope are reviewed for your site.", "ru": "Разрабатываем ПО для записей оборудования, доступа к ПК и калибровки. Функции и объём внедрения уточняются для вашего объекта."},
  "구성·일정·산출물·계약 조건과 검증 요구·지원 범위를 협의합니다.": {en: "Agree on configuration, schedule, deliverables, contract terms, validation needs and support scope.", ru: "Согласование комплектации, сроков, результатов работ, условий договора, требований к валидации и объёма поддержки."},
  "합의한 범위에 따라 적용 결과를 확인하고 현장 절차·사용자 교육·운영 책임을 점검합니다.": {en: "Check the agreed implementation, site procedures, user training and operational responsibilities.", ru: "Проверка внедрения в согласованных границах, процедур объекта, обучения пользователей и ответственности за эксплуатацию."},
  "DataStation 소개서 보기": {en: "View the DataStation brochure", ru: "Брошюра DataStation"},
};
