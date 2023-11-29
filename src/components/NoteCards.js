import React from "react";

function NoteCards() {
  return (
      <div class="card">
        <h5 class="card-header">Featured</h5>
        <i class="fa-duotone fa-pen-to-square text-end"></i>
        <i class="fa-duotone fa-trash text-end"></i>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
  );
}

export default NoteCards;
