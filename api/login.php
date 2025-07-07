<?php
// Iniciar la sesión para poder guardar información del usuario logueado
session_start();

// Incluir el archivo de conexión
include '../conexion.php';

// Establecer la cabecera para indicar que la respuesta será en formato JSON
header('Content-Type: application/json');

// Obtener los datos enviados en el cuerpo de la solicitud (en formato JSON)
$datos = json_decode(file_get_contents('php://input'), true);

// Verificar que se recibieron el email y la contraseña
if (!isset($datos['email']) || !isset($datos['password'])) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos.']);
    exit;
}

$email = $datos['email'];
$password_ingresada = $datos['password'];

// Preparar la consulta para buscar al usuario por su email
$sql = "SELECT id, password, nombres FROM usuarios WHERE email = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 1) {
    // El usuario existe, ahora verificamos la contraseña
    $usuario = $resultado->fetch_assoc();
    
    // password_verify() compara la contraseña ingresada con el hash guardado
    if (password_verify($password_ingresada, $usuario['password'])) {
        // ¡Contraseña correcta! El login es exitoso.
        
        // Guardamos información clave en la sesión del servidor
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nombre'] = $usuario['nombres'];
        
        // Enviamos una respuesta de éxito
        echo json_encode(['success' => true, 'message' => 'Login exitoso. Redirigiendo...']);
        
    } else {
        // Contraseña incorrecta
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
    }
} else {
    // El usuario no existe
    echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
}

$stmt->close();
$conexion->close();
?>
