# Notification System Design

## Overview
In this solution, notifications are fetched directly from the given API and processed in memory without storing them anywhere.

## Approach
First, all notifications are retrieved using the API. After that, they are sorted based on priority and time.

## Priority Logic
Each notification type is given a priority:
- Result notifications are the most important
- Placement notifications come next
- Event notifications have the lowest priority

## Sorting Strategy
The notifications are sorted in two steps:
1. Based on priority (higher priority first)
2. If priorities are the same, then by timestamp (latest first)

## Top Notifications
After sorting, only the top 10 notifications are selected and displayed.

## Handling New Data
If new notifications arrive, the same process can be repeated:
- Fetch data again
- Sort it again
- Extract top 10  
This ensures the output always stays updated.

## Scalability
For larger datasets, more efficient approaches like priority queues or heaps can be used to improve performance.