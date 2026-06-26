-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "sphere" TEXT,
    "organ" TEXT,
    "place" TEXT,
    "formData" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "generatedText" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "price" INTEGER NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "paymentId" TEXT,
    "pdfUrl" TEXT,
    "docxUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
