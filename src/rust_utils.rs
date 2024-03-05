#[no_mangle]
pub extern "C" fn add(x: i32, y: i32) -> i32 { x + y }

#[no_mangle]
pub extern "C" fn subtract(x: i32, y: i32) -> i32 { x - y }

#[no_mangle]
pub extern "C" fn multiply(x: i32, y: i32) -> i32 { x * y }

#[no_mangle]
pub extern "C" fn divide(x: i32, y: i32) -> i32 { if y == 0 { x } else { x / y } }