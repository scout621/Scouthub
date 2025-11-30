#!/bin/bash
# Cloudflare IP Scanner
# Scans 104.18.0.0 - 104.18.255.255 and logs online hosts

base="104.18"
output="online104.txt"

rm -f $output

echo "Starting scan of 104.18.0.0/16..."

echo "Scanning... this may take a long time."

for i in $(seq 0 255); do
    for j in $(seq 0 255); do
        ip="$base.$i.$j"
        ping -c1 -W1 $ip >/dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "[ONLINE]  $ip"
            echo $ip >> $output
        else
            echo "[OFFLINE] $ip"
        fi
    done
done

echo "Scan complete. Online hosts saved in $output"
