import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Client} from '../../model/client';
import {ClientService} from '../../service/client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-options',
  templateUrl: './client-options.component.html',
  styleUrls: ['./client-options.component.css']
})
export class ClientOptionsComponent implements OnInit {

  clientGroup: FormGroup;
  id: number;
  myClient: Client = new Client('', '', '', '', '');

  constructor(private formBuilder: FormBuilder,
              private serviceClient: ClientService,
              private router: Router,
              private root: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = +this.root.snapshot.paramMap.get('id');
    if (this.id) {
      this.serviceClient.getClient(this.id).subscribe(res => {
        this.myClient = res;
      });
    }
    this.clientGroup = this.formBuilder.group({
      client: this.formBuilder.group({
        name: [''],
        age: [''],
        address: [''],
        phone: [''],
        gender: [''],
        // dateCreated: [''],
        // dateLastVisit: [''],
      })
    });
  }

  getName() {
    return this.clientGroup.get("client").value.name;
  }

  getAge() {
    return this.clientGroup.get("client").value.age;
  }

  getAddress() {
    return this.clientGroup.get("client").value.address;
  }

  getPhone() {
    return this.clientGroup.get("client").value.phone;
  }

  getGender() {
    return this.clientGroup.get("client").value.gender;
  }

  add() {
    const client = new Client(
      this.getName(),
      this.getGender(),
      this.getAge(),
      this.getPhone(),
      this.getAddress()
    );
    if (!this.id) {
      if (!client.gender) {
        client.gender = 'Н'
      }
      this.serviceClient.addClient(client).subscribe(() => {
        this.router.navigateByUrl('/clients');
      });
    } else {
      for (const key of Object.keys(client)) {
        if (client[key] == '') {
          client[key] = this.myClient[key];
        }
      }
      client.id = this.myClient.id;
      if (!client.gender) {
        client.gender = 'Н'
      }
      this.serviceClient.editClient(client).subscribe(() => {
        this.router.navigateByUrl('/clients');
      });
    }
  }
}
