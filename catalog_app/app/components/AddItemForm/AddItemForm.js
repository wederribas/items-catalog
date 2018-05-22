import React from 'react'
import {formContainer} from './styles.css'

export default function AddItemForm() {
  return (
    <div className={formContainer}>
      <form>
        <p>
          <label>
            Name
            <br />
            <input type="text" id="name" name="name" />
          </label>
        </p>
        <p>
          <label>
            Description
            <br />
            <textarea rows={5} id="description" name="description" />
          </label>
        </p>
        <p>
          <label>
            Category
            <br />
            <input type="text" id="category" name="category" />
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
