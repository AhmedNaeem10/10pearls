CREATE TABLE CUSTOMER(
	CUSTOMER_ID INT,
    USERNAME VARCHAR(15) NOT NULL,
    PASSWORD VARCHAR(18) NOT NULL,
    EMAIL VARCHAR(50),
    FIRST_NAME VARCHAR(15),
    LAST_NAME VARCHAR(15),
    AGE INT NOT NULL,
    PHONE VARCHAR(11),
    CNIC VARCHAR(13),
    ADDRESS VARCHAR(100),

	CONSTRAINT PK_CUSTOMER PRIMARY KEY (CUSTOMER_ID)
);

CREATE TABLE WORKER(
	WORKER_ID INT,
    FIRST_NAME VARCHAR(15) NOT NULL,
    LAST_NAME VARCHAR(15) NOT NULL,
    AGE INT NOT NULL,
    PHONE VARCHAR(11) NOT NULL,
    CNIC VARCHAR(13) NOT NULL,
    ADDRESS VARCHAR(100),
    EMAIL VARCHAR(50),
    
    CONSTRAINT PK_WORKER PRIMARY KEY (WORKER_ID)
);

CREATE TABLE ADMIN(
	ADMIN_ID INT,
    USERNAME VARCHAR(15) NOT NULL,
    PASSWORD VARCHAR(15) NOT NULL,
    
    CONSTRAINT PK_ADMIN PRIMARY KEY (ADMIN_ID)
);

CREATE TABLE REQUEST(
	REQUEST_ID INT,
    CUSTOMER_ID INT,
    DATE_TIME TIMESTAMP NOT NULL,
    REQUEST_STATUS VARCHAR(15) NOT NULL,
    
    CONSTRAINT PK_REQUEST PRIMARY KEY (REQUEST_ID),
    CONSTRAINT FK_CUSTOMER FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER(CUSTOMER_ID)
);

CREATE TABLE SERVICE_DETAIL(
	SERVICE_DETAIL_ID INT,
    WORKER_ID INT,
    SERVICE_NAME VARCHAR(15) NOT NULL,
    SERVICE_CHARGES FLOAT NOT NULL,
    
    CONSTRAINT PK_SERVICE_DETAIL PRIMARY KEY (SERVICE_DETAIL_ID),
    CONSTRAINT FK_SERVICE_DETAIL_WORKER FOREIGN KEY (WORKER_ID) REFERENCES WORKER(WORKER_ID)
);

CREATE TABLE SERVICE(
	SERVICE_ID INT,
    CUSTOMER_ID INT,
    SERVICE_DETAIL_ID INT,
    DATE_TIME TIMESTAMP NOT NULL,
    PAYMENT_METHOD VARCHAR(15),
    
    CONSTRAINT PK_SERVICE PRIMARY KEY (SERVICE_ID),
    CONSTRAINT FK_SERVICE_SERVICE_DETAIL FOREIGN KEY (SERVICE_DETAIL_ID) REFERENCES SERVICE_DETAIL(SERVICE_DETAIL_ID)
);

CREATE TABLE REVIEW(
	REVIEW_ID INT,
    SERVICE_ID INT,
    RATING INT NOT NULL,
    FEEDBACK TEXT,
    
    CONSTRAINT PK_REVIEW PRIMARY KEY (REVIEW_ID),
    CONSTRAINT FK_REVIEW_SERVICE FOREIGN KEY (SERVICE_ID) REFERENCES SERVICE(SERVICE_ID)
);

CREATE TABLE CARD_DETAILS(
	CARD_ID INT,
    CUSTOMER_ID INT,
    MM VARCHAR(2),
    YYYY VARCHAR(4),
    CARD_NUM VARCHAR(4),  -- LAST 4 DIGITS
    CVC VARCHAR(4),
    
    CONSTRAINT PK_CARD_DETAILS PRIMARY KEY (CARD_ID),
    CONSTRAINT FK_CARD_DETAILS_CUSTOMER FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER(CUSTOMER_ID)
);

