#!/usr/bin/env bash
echo "Timeline :"
git -C ~/OpenClaw_Light log -1 --pretty=format:"   • %s"
echo ""
