document.getElementById('loadSales').addEventListener('click', async () => {
    const salesContainer = document.getElementById('salesContainer');
    salesContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar nuevas ventas

    try {
        const response = await fetch('https://bicis-aopy.onrender.com/ventas/todas');
        if (!response.ok) {
            throw new Error('Error al cargar las ventas');
        }

        const ventas = await response.json();
        console.log(ventas); // Verificar la respuesta

        if (ventas.length === 0) {
            salesContainer.innerHTML = '<p>No hay ventas registradas.</p>';
            return;
        }

        const list = document.createElement('ul');

        ventas.forEach(venta => {
            console.log(`ID Venta: ${venta.id_venta}, Dirección de Entrega: ${venta.direccion_entrega}`); // Log para depuración

            const listItem = document.createElement('li');

            // Procesar artículos para mostrar solo el modelo y el precio
            let articulosList = '';
            if (venta.articulos) {
                articulosList = venta.articulos.map(articulo => {
                    return `<div>
                        <strong>Articulos:</strong> ${articulo.modelo}<br>
                        <strong>Precio:</strong> ${articulo.precio}
                    </div>`;
                }).join(''); // Une todos los artículos en una cadena
            }

            listItem.innerHTML = `
                <strong>ID Venta:</strong> ${venta.id_venta}<br>
                <strong>ID Usuario:</strong> ${venta.id_user}<br>
                <strong>Artículos:</strong><br>${articulosList}<br>
                <strong>Total Compra:</strong> ${venta.total_compra}<br>
                <strong>Dirección de Entrega:</strong> ${venta.direccion_entrega || 'No disponible'}<br>
                <strong>Fecha de Venta:</strong> ${venta.date_sell}<br>
            `;

            list.appendChild(listItem);
        });

        salesContainer.appendChild(list);
    } catch (error) {
        salesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
