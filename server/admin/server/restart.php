<?php
exec("//usr/bin/systemctl restart ltb", $o, $r);
print_r($o);
?>