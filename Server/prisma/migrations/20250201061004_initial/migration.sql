-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "userName" VARCHAR(200) NOT NULL,
    "userAvatar" VARCHAR(200) NOT NULL,
    "time" VARCHAR(200) NOT NULL,
    "content" VARCHAR(500),
    "postTitle" VARCHAR(150),
    "groupName" VARCHAR(150),
    "commentImage" VARCHAR(360),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
